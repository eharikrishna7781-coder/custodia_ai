const translations = {
  en: {
    greeting: 'Hello! Describe your symptoms or upload an image.',
    needsDoctor: 'You need to see a doctor. Here are the nearest clinics:',
    noDoctor: 'You may not need a doctor immediately.',
    transport: {
      ambulance: 'Ambulance',
      volunteer: 'Volunteer Driver',
      booked: ' booked — Driver: ',
      eta: 'ETA: ',
      min: ' min'
    },
    followup: {
      advice: 'Follow up after 48 hours if symptoms persist.'
    }
  },
  hi: {
    greeting: 'नमस्ते! अपने लक्षण बताइए या एक तस्वीर अपलोड करें।',
    needsDoctor: 'आपको डॉक्टर के पास जाना चाहिए। पास के क्लीनिक:',
    noDoctor: 'आपको अभी डॉक्टर की आवश्यकता नहीं हो सकती।',
    transport: {
      ambulance: 'एम्बुलेंस',
      volunteer: 'स्वयंसेवक ड्राइवर',
      booked: ' बुक किया — ड्राइवर: ',
      eta: 'अनुमानित समय: ',
      min: ' मिनट'
    },
    followup: { advice: 'यदि लक्षण बने रहें तो 48 घंटे के बाद फॉलो-अप करें।' }
  },
  ta: { greeting: 'வணக்கம்! உங்கள் அறிகுறிகள் சொல்லவும் அல்லது படம் பதிவேற்றவும்.', needsDoctor: 'நீங்கள் மருத்துவரை பார்க்க வேண்டும். அருகிலுள்ள மருத்துவமனைகள்:', noDoctor: 'உங்களுக்கு உடனடி மருத்துவம் தேவையில்லை என்று இருக்கலாம்.', transport: { ambulance: 'ஆம்புலன்ஸ்', volunteer: 'தன்னார்வ ஓட்டுநர்', booked: 'аш', eta: 'அனுமான நேரம்: ', min: ' நிமிடம்' }, followup: { advice: 'அறிகுறிகள் நீடித்தால் 48 மணித்தியாலத்திற்கு பிறகு பின்தொடரவும்.' } },
  te: { greeting: 'హలో! మీ లక్షణాలు చెప్పండి లేదా చిత్రం అప్లోడ్ చేయండి.', needsDoctor: 'మీకు డాక్టర్ చూడాలి. సమీప క్లినిక్లు:', noDoctor: 'మీకు వెంటనే డాక్టర్ అవసరం ఉండకపోవచ్చు.', transport: { ambulance: 'ఆంబులెన్స్', volunteer: 'స్వచ్ఛంద డ్రైవర్', booked: ' బుక్ చేయబడింది — డ్రైవర్: ', eta: 'సమయం: ', min: ' నిమిషాలు' }, followup: { advice: 'లక్షణాలు కొనసాగితే 48 గంటల తర్వాత ఫాలోఅప్ చేయండి.' } },
  kn: { greeting: 'ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ ಅಥವಾ ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ.', needsDoctor: 'ನೀವು ವೈದ್ಯರ ಬಳಿ ಹೋಗಬೇಕು. ಹತ್ತಿರದ ಕ್ಲಿನಿಕ್‌ಗಳು:', noDoctor: 'ಕ್ಷಣಿಕವಾಗಿ ವೈದ್ಯರ ಅಗತ್ಯವಿಲ್ಲದಿರಬಹುದು.', transport: { ambulance: 'ಅಂಬ್ಯುಲನ್', volunteer: 'ಸ್ವಯಂ ಸೇವಕ ಚಾಲಕ', booked: ' ಬುಕ್ ಮಾಡಲಾಗಿದೆ — ಚಾಲಕ: ', eta: 'ಅಂದಾಜು: ', min: ' ನಿಮಿಷಗಳು' }, followup: { advice: 'ಲಕ್ಷಣಗಳು ಮುಂದುವರಿದರೆ 48 ಗಂಟೆಗಳ ನಂತರ ತಪಾಸಣೆ ಮಾಡಿ.' } },
  ml: { greeting: 'ഹലോ! നിങ്ങളുടെ ലക്ഷണങ്ങൾ പറയുക അല്ലെങ്കിൽ ഒരു ചിത്രം അപ്‌ലോഡ് ചെയ്യുക.', needsDoctor: 'നിങ്ങൾക്ക് ഡോക്ടറെ കാണേണ്ടതുണ്ട്. സമീപത്തുള്ള ക്ലിനിക്കുകൾ:', noDoctor: 'തുടർച്ചയായ ചികിത്സ ആവശ്യമില്ലായ്മ ഉണ്ടായിരിക്കാം.', transport: { ambulance: 'ആംബുലൻസ്', volunteer: 'സേവക ഡ്രൈവർ', booked: ' ബുക്ക് ചെയ്തു — ഡ്രൈവർ: ', eta: 'എടിഎ: ', min: ' മിനിറ്റ്' }, followup: { advice: 'ലക്ഷണങ്ങൾ തുടരുകയാണെങ്കിൽ 48 മണിക്കൂറിന് ശേഷം ഫോളോ-അപ്പ് ചെയ്യുക.' } }
};

export function getTranslation(lang = 'en', ...keys) {
  const base = translations[lang] || translations.en;
  return keys.reduce((obj, k) => (obj && obj[k] ? obj[k] : (translations.en[k] || null)), base) || translations.en;
}

export default translations;
export const translations = {
  en: {
    triage: {
      critical: 'Critical – Call 108 immediately!',
      high: 'High urgency – See a doctor within 24 hours.',
      medium: 'Medium – Consult a doctor if symptoms persist.',
      low: 'Low – Home care is sufficient.',
      needsDoctor: 'You need to see a doctor. Here are the nearest clinics:',
      noDoctor: 'You may not need a doctor immediately.',
    },
    transport: {
      ambulance: 'Ambulance',
      volunteer: 'Volunteer Driver',
      booked: ' booked — Driver: ',
      eta: 'ETA: ',
      min: ' min',
    },
    followup: {
      instructions: 'Rest, stay hydrated, and call if symptoms worsen.',
      reminders: ['Dolo 650 (twice daily)', 'Cough syrup (after meals)'],
      visitCheck: 'Reminder SMS will be sent 1 day before appointment.',
    },
    common: {
      loading: 'Loading...',
      error: 'Something went wrong. Please try again.',
      send: 'Send',
      continue: 'Continue',
      back: 'Back',
      confirm: 'Confirm',
    },
  },
  hi: {
    triage: {
      critical: 'गंभीर – तुरंत 108 पर कॉल करें!',
      high: 'उच्च – 24 घंटे के भीतर डॉक्टर को दिखाएं।',
      medium: 'मध्यम – यदि लक्षण बने रहें तो डॉक्टर से सलाह लें।',
      low: 'कम – घर पर आराम पर्याप्त है।',
      needsDoctor: 'आपको डॉक्टर को दिखाना चाहिए। यहाँ नजदीकी क्लीनिक हैं:',
      noDoctor: 'आपको तुरंत डॉक्टर की आवश्यकता नहीं है।',
    },
    transport: {
      ambulance: 'एम्बुलेंस',
      volunteer: 'स्वयंसेवक ड्राइवर',
      booked: ' बुक किया गया — ड्राइवर: ',
      eta: 'अनुमानित समय: ',
      min: ' मिनट',
    },
    followup: {
      instructions: 'आराम करें, खूब पानी पिएं, और यदि लक्षण बिगड़ें तो कॉल करें।',
      reminders: ['डोलो 650 (दिन में दो बार)', 'कफ सिरप (भोजन के बाद)'],
      visitCheck: 'अपॉइंटमेंट से 1 दिन पहले रिमाइंडर SMS भेजा जाएगा।',
    },
    common: {
      loading: 'लोड हो रहा है...',
      error: 'कुछ गड़बड़ हो गई। कृपया पुनः प्रयास करें।',
      send: 'भेजें',
      continue: 'जारी रखें',
      back: 'वापस',
      confirm: 'पुष्टि करें',
    },
  },
  ta: {
    triage: {
      critical: 'மிக முக்கியமான – உடனடியாக 108 ஐ அழைக்கவும்!',
      high: 'உயர் – 24 மணி நேரத்திற்குள் மருத்துவரைப் பார்க்கவும்.',
      medium: 'நடுத்தர – அறிகுறிகள் தொடர்ந்தால் மருத்துவரை அணுகவும்.',
      low: 'குறைவு – வீட்டில் ஓய்வு போதுமானது.',
      needsDoctor: 'நீங்கள் மருத்துவரைப் பார்க்க வேண்டும். அருகிலுள்ள மருத்துவமனைகள்:',
      noDoctor: 'உங்களுக்கு உடனடியாக மருத்துவர் தேவையில்லை.',
    },
    transport: {
      ambulance: 'ஆம்புலன்ஸ்',
      volunteer: 'தன்னார்வ ஓட்டுநர்',
      booked: ' பதிவு செய்யப்பட்டது — ஓட்டுநர்: ',
      eta: 'மதிப்பிடப்பட்ட நேரம்: ',
      min: ' நிமிடம்',
    },
    followup: {
      instructions: 'ஓய்வு எடுத்து, தண்ணீர் குடிக்கவும், அறிகுறிகள் மோசமடைந்தால் அழைக்கவும்.',
      reminders: ['டோலோ 650 (ஒரு நாளைக்கு இருமுறை)', 'இருமல் சிரப் (உணவுக்கு பிறகு)'],
      visitCheck: 'சந்திப்புக்கு 1 நாள் முன்னதாக நினைவூட்டல் SMS அனுப்பப்படும்.',
    },
    common: {
      loading: 'ஏற்றுகிறது...',
      error: 'ஏதோ தவறு நடந்துவிட்டது. மீண்டும் முயற்சிக்கவும்.',
      send: 'அனுப்பு',
      continue: 'தொடரவும்',
      back: 'பின் செல்',
      confirm: 'உறுதி செய்',
    },
  },
};

export function getTranslation(lang, key, subKey) {
  return translations[lang]?.[key]?.[subKey] || translations.en[key][subKey];
}