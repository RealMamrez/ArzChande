import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where, orderBy, deleteDoc, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDxHDdAFYhQQZQkzUTwOB_ZhQkIHJPEk8Y",
  authDomain: "arzchande.firebaseapp.com",
  projectId: "arzchande",
  storageBucket: "arzchande.appspot.com",
  messagingSenderId: "1098133788777",
  appId: "1:1098133788777:web:c5b0a1e79b0c0c1c5f5f5f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const COLLECTIONS = {
  CURRENCIES: 'currencies',
  PRICE_HISTORY: 'priceHistory',
  SETTINGS: 'settings'
};

export const getAllCurrencies = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.CURRENCIES));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching currencies:', error);
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
    const currencyRef = doc(db, COLLECTIONS.CURRENCIES, currencyId);
    await updateDoc(currencyRef, {
      ...updates,
      lastUpdated: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating currency:', error);
    throw error;
  }
};

export const deleteCurrency = async (currencyId) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.CURRENCIES, currencyId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting currency:', error);
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