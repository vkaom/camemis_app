import LocalizedStrings from 'react-native-localization';
import global from './global'
export default new LocalizedStrings({
  en: {
      ...global.en,
      CLASS_INFORMATION:"Class Information",
      ACADEMIC_YEAR:"Academic Year",
      GRADE:"Grade",
      CLASS:"Class",
      PHONE:"Phone",
      EMAIL:"Email",
      STUDENT_LIST:"Student List",
      TEACHER:"Teacher",
      SUBJECT:"Subject",

    }
  ,
  kh: {
    ...global.kh,
    CLASS_INFORMATION:"ពត៌មានថ្នាក់",
    ACADEMIC_YEAR:"ឆ្នាំសិក្សា",
    GRADE:"កំរិត",
    CLASS:"ថ្នាក់",
    PHONE:"ទូរស័ព្ទ",
    EMAIL:"អ៊ីម៉ែល",
    STUDENT_LIST:"បញ្ជីសិស្ស",
    TEACHER:"គ្រូបង្រៀន",
    SUBJECT:"មុខវិជ្ជា",

  },
});
