const API_KEY = 'YOUR_API_KEY'; // باید با API key واقعی جایگزین شود
const BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export const fetchCurrencyRates = async () => {
  try {
    const response = await fetch(`${BASE_URL}/USD`);
    const data = await response.json();
    
    // تبدیل داده‌ها به فرمت مورد نیاز برنامه
    return [
      {
        currency: 'Dollar',
        code: 'USD',
        value: 1,
        change: 0,
        flag: '🇺🇸'
      },
      {
        currency: 'Euro',
        code: 'EUR',
        value: data.rates.EUR,
        change: 0,
        flag: '🇪🇺'
      },
      {
        currency: 'Pound',
        code: 'GBP',
        value: data.rates.GBP,
        change: 0,
        flag: '🇬🇧'
      },
      {
        currency: 'Yen',
        code: 'JPY',
        value: data.rates.JPY,
        change: 0,
        flag: '🇯🇵'
      },
      {
        currency: 'Australian Dollar',
        code: 'AUD',
        value: data.rates.AUD,
        change: 0,
        flag: '🇦🇺'
      },
      {
        currency: 'Canadian Dollar',
        code: 'CAD',
        value: data.rates.CAD,
        change: 0,
        flag: '🇨🇦'
      },
      {
        currency: 'Swiss Franc',
        code: 'CHF',
        value: data.rates.CHF,
        change: 0,
        flag: '🇨🇭'
      },
      {
        currency: 'Chinese Yuan',
        code: 'CNY',
        value: data.rates.CNY,
        change: 0,
        flag: '🇨🇳'
      }
    ];
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    throw error;
  }
}; 