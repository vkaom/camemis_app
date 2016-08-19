import LocalizedStrings from 'react-native-localization';
import global from './global'
export default new LocalizedStrings({
  en:{
    ...global.en,
  },
  kh: {
    ...global.kh,
  }
});
