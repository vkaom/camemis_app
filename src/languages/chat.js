import LocalizedStrings from 'react-native-localization';
import global from './global'
export default new LocalizedStrings({
  en: {
      ...global.en,
      CHAT : "Chat",
      SEARCH_USER: "Search user",
      WRITE_A_MESSAGE: "Write a message...",
    }
  ,
  kh: {
    ...global.kh,
    CHAT : "ជជែក",
    SEARCH_USER: "ស្វែករកអ្នកប្រើប្រាស់",
    WRITE_A_MESSAGE: "សរសេរសារ..."
  },
});
