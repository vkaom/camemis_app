import LocalizedStrings from 'react-native-localization';
import global from './global'
export default new LocalizedStrings({
  en: {
      ...global.en,
      DASHBOARD : "Dashboard",
      ACADEMIC : "Academic",
      SCHEDULE : "Schedule",
      ATTENDANCE : "Attendance",
      DISCIPLINE : "Discipline",
      TRANSCRIPT : "Transcript",
      CHAT : "Chat",
      CHAT_ROOM : "Chat Room",
      CLASS : "Class",
      LOGOUT    : "Logout",
    }
  ,
  kh: {
    ...global.kh,
    DASHBOARD : "ផ្ទាំងគ្រប់គ្រង",
    ACADEMIC : "អប់រំ",
    SCHEDULE : "កាលវិភាគ",
    ATTENDANCE : "វត្តមាន",
    DISCIPLINE : "វិន័យ",
    TRANSCRIPT : "ប្រតិចារឹក",
    CHAT : "ជជែក",
    CHAT_ROOM : "បន្ទប់ជជែក",
    CLASS : "ថ្នាក់",
    LOGOUT: "ចាកចេញ"
  },
});
