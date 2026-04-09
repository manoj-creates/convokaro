import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * Generates a context-aware chat response from Gemini 1.5 Flash.
 * @param {string} userMessage - The message from the user.
 * @param {string} scenarioContext - Structural instruction for the model.
 * @param {string} language - User's chosen language ('English', 'Hindi', 'Hinglish').
 * @returns {Promise<object>} - The AI generated JSON: { text: "...", suggestions: [...] }.
 */
export async function generateChatResponse(userMessage, scenarioContext, language = 'English') {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { response_mime_type: "application/json" },
      systemInstruction: `${scenarioContext} 

      Respond STRICTLY in the following language: ${language}.
      - If English: Use pure, natural English.
      - If Hindi: Use pure Hindi in Devanagari script.
      - If Hinglish: Use a natural, conversational mix of Hindi (Romanized) and English.
      
      Keep the response text under 2 sentences.
      
      Your output MUST be a JSON object with this exact structure:
      {
        "text": "The AI's response message",
        "suggestions": ["3 short, natural follow-up phrases the user could say"]
      }`
    });

    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();
    
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse Gemini JSON:", text);
      return { text: text, suggestions: ["Can you explain that?", "Okay, what's next?", "I understand."] };
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      text: "I'm having a bit of trouble responding right now. Let's try again in a second!", 
      suggestions: ["Try again", "What happened?", "Okay"] 
    };
  }
}
