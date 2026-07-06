export async function analyzeImage(imageData) {
  // Simple stubbed analysis: return mock results for local development.
  // If a GEMINI_API_KEY is provided, this function should be replaced
  // with a real call to the Google Generative AI Vision API.
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return {
      condition: 'Abrasion',
      severity: 'mild',
      recommendation: 'Clean with water and apply antiseptic. Seek care if bleeding persists.',
      first_aid: 'Apply pressure, clean, and bandage.',
      emergency: false,
    };
  }

  // Placeholder: pretend we called Gemini Vision and got a response.
  try {
    return {
      condition: 'Suspected laceration',
      severity: 'moderate',
      recommendation: 'Visit the nearest clinic for wound cleaning and suturing.',
      first_aid: 'Apply direct pressure and seek immediate care.',
      emergency: true,
    };
  } catch (err) {
    return { condition: 'Unknown', severity: 'unknown', recommendation: 'Unable to analyze', first_aid: '', emergency: false };
  }
}

export default analyzeImage;