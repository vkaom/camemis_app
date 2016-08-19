import LocalizedStrings from 'react-native-localization';
import global from './global'
export default new LocalizedStrings({
  en:{
    ...global.en,
    SCHOOL_ID: "School ID",
  },
  kh: {
    ...global.kh,
    SCHOOL_ID: "លេខកូដសាលា"
  }
});
