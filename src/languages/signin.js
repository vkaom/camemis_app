import LocalizedStrings from 'react-native-localization';
import global from './global'
export default new LocalizedStrings({
  en: {
      ...global.en,
      USERNAME:"Username",
      PASSWORD:"Password",
      "SIGN_IN": "Sign In",
      "ROLE" : "Role",
      "CHANGE_SCHOOL" : "Change School",
      "TEACHER": "Teacher",
      "STUDENT" : "Student",
      "PARENT"  : "Parent",
    }
  ,
  kh: {
    ...global.kh,
    USERNAME:"ឈ្មោះ",
    PASSWORD:"លេខសំងាត់",
    SIGN_IN: "ចូលប្រើ",
    "ROLE" : "តួនាទី",
    "CHANGE_SCHOOL" : "ប្តូរសាលា",
    "TEACHER": "គ្រូបង្រៀន",
    "STUDENT" : "កូនសិស្ស",
    "PARENT"  : "អាណាព្យាបាល",
  },
});
