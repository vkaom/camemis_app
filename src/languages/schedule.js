import LocalizedStrings from 'react-native-localization';
import global from './global'
export default new LocalizedStrings({
  en: {
      ...global.en,
      DAILY:"Daily",
      WEEKLY:"Weekly",

    }
  ,
  kh: {
    ...global.kh,
    DAILY:"ប្រចាំថ្ងៃ",
    WEEKLY:"ប្រចាំសប្តាហ៏",

  },
});
