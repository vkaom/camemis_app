import LocalizedStrings from 'react-native-localization';
import global from './global'
export default new LocalizedStrings({
  en: {
      ...global.en,
      USERNAME:"Username",
      PASSWORD:"Password",
      "SIGN_IN": "Sign In"
    }
  ,
  kh: {
    ...global.kh,
    USERNAME:"ឈ្មោះ",
    PASSWORD:"លេខសំងាត់",
    SIGN_IN: "ចូលប្រើ",
  },
});
