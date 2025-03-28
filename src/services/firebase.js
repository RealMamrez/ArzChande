import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where, orderBy, deleteDoc, addDoc } from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD4TO5w1ZVbcTZNnpKk2eW35j-7IVmasMM",
  authDomain: "arzchande.firebaseapp.com",
  projectId: "arzchande",
  storageBucket: "arzchande.firebasestorage.app",
  messagingSenderId: "730601036236",
  appId: "1:730601036236:web:9dc3d7dc76423468972569",
  measurementId: "G-G0N9CE49CG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const COLLECTIONS = {
  CURRENCIES: 'currencies',
  USERS: 'users',
  SETTINGS: 'settings',
  ADMIN_LOGS: 'admin_logs',
  PRICE_HISTORY: 'priceHistory'
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userCredential.user.uid));
    if (!userDoc.exists() || !userDoc.data().isAdmin) {
      await signOut(auth);
      throw new Error('Error');
    }
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error.code, error.message);
    throw error;
  }
};

export const registerUser = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      ...userData,
      createdAt: new Date().toISOString()
    });
    
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, user.uid));
        if (!userDoc.exists() || !userDoc.data().isAdmin) {
          await signOut(auth);
          resolve(null);
          return;
        }
      }
      resolve(user);
    }, reject);
  });
};

export const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Get user data error:', error);
    throw error;
  }
};

export const updateUserData = async (userId, data) => {
  try {
    await updateDoc(doc(db, 'users', userId), data);
  } catch (error) {
    console.error('Update user data error:', error);
    throw error;
  }
};

export const getAllCurrencies = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.CURRENCIES));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Get currencies error:', error);
    throw error;
  }
};

export const getCurrency = async (currencyId) => {
  try {
    const currencyRef = doc(db, COLLECTIONS.CURRENCIES, currencyId);
    const currencyDoc = await getDoc(currencyRef);
    if (currencyDoc.exists()) {
      return {
        id: currencyDoc.id,
        ...currencyDoc.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching currency:', error);
    throw error;
  }
};

export const updateCurrencyPrice = async (currencyId, newPrice) => {
  try {
    const currencyRef = doc(db, COLLECTIONS.CURRENCIES, currencyId);
    const currencyDoc = await getDoc(currencyRef);
    
    if (!currencyDoc.exists()) {
      throw new Error('Currency not found');
    }

    const currencyData = currencyDoc.data();
    const oldPrice = currencyData.value;
    const change = ((newPrice - oldPrice) / oldPrice) * 100;

    await updateDoc(currencyRef, {
      value: newPrice,
      change: change,
      lastUpdated: new Date().toISOString()
    });

    await addDoc(collection(db, COLLECTIONS.PRICE_HISTORY), {
      currencyId,
      price: newPrice,
      timestamp: new Date().toISOString(),
      type: currencyData.type
    });

    return { success: true, change };
  } catch (error) {
    console.error('Error updating currency price:', error);
    throw error;
  }
};

export const getPriceHistory = async (currencyId, days = 7) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const querySnapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.PRICE_HISTORY),
        where('currencyId', '==', currencyId),
        where('timestamp', '>=', startDate.toISOString()),
        orderBy('timestamp', 'asc')
      )
    );

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching price history:', error);
    throw error;
  }
};

export const updateCurrency = async (currencyId, updates) => {
  try {
    await checkAdminAuth();
    const currencyRef = doc(db, COLLECTIONS.CURRENCIES, currencyId);
    await updateDoc(currencyRef, {
      ...updates,
      lastUpdated: new Date().toISOString()
    });
    await addAdminLog('currency_update', { currencyId, updates });
  } catch (error) {
    console.error('Update currency error:', error);
    throw error;
  }
};

export const deleteCurrency = async (currencyId) => {
  try {
    await checkAdminAuth();
    await deleteDoc(doc(db, COLLECTIONS.CURRENCIES, currencyId));
    await addAdminLog('currency_delete', { currencyId });
  } catch (error) {
    console.error('Delete currency error:', error);
    throw error;
  }
};

export const getSettings = async () => {
  try {
    const settingsRef = doc(db, COLLECTIONS.SETTINGS, 'general');
    const settingsDoc = await getDoc(settingsRef);
    return settingsDoc.exists() ? settingsDoc.data() : null;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

export const updateSettings = async (settings) => {
  try {
    const settingsRef = doc(db, COLLECTIONS.SETTINGS, 'general');
    await setDoc(settingsRef, settings, { merge: true });
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};

const checkAdminAuth = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('لطفا ابتدا وارد شوید');
  
  const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, user.uid));
  if (!userDoc.exists() || !userDoc.data().isAdmin) {
    throw new Error('دسترسی غیرمجاز');
  }
};

const addAdminLog = async (action, details) => {
  try {
    const user = auth.currentUser;
    await addDoc(collection(db, COLLECTIONS.ADMIN_LOGS), {
      userId: user.uid,
      userEmail: user.email,
      action,
      details,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Admin log error:', error);
  }
}; 