import I18n from 'i18n-js';
import en from 'languages/en.json';
import vi from 'languages/vi.json';

I18n.fallbacks = true;
I18n.locale = 'vi';

I18n.translations = {
  en,
  vi,
};

export const switchLanguage = (locale: string) => {
  I18n.locale = locale;
};

export const updateLangFiles = async () => {
  try {
    I18n.fallbacks = true;
    I18n.locale = 'vi';

    I18n.translations = {
      en,
      vi,
    };
    switchLanguage('vi');
  } catch (error) {
    console.log(error.message);
  }
};

export const translate = (text: string, variables?: object) => {
  return I18n.t(text, variables);
};

// Converts number in to VND price format; 5000 => 5.000
export const formatPrice = (value: number) =>
  I18n.toCurrency(value, {
    unit: '',
    precision: 0,
    delimiter: '.',
  });
export default I18n;
