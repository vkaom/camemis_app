import LocalizedStrings from 'react-native-localization';
import global from './global'
export default new LocalizedStrings({
  en: {
      ...global.en,
      DAILY:"Daily",
      ALL:"All",
      FIRST:"1st",
      SECOND:"2nd",
      DATE:"Date",
      TIME:"Time",
      TYPE:"Type",
      SUBJECT:"Subject",

    }
  ,
  kh: {
    ...global.kh,
    DAILY:"ប្រចាំថ្ងៃ",
    ALL:"ទាំងអស់",
    FIRST:"ទី១",
    SECOND:"ទី២",
    DATE:"ថ្ងៃ",
    TIME:"ម៉ោង",
    TYPE:"ប្រភេទ",
    SUBJECT:"មុខវិជ្ជា",

  },
});
