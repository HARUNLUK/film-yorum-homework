// Import node-fetch since fetch is not available in Node.js by default
import fetch from 'node-fetch';

const testAIAPI = async () => {
  try {
    console.log('Sending request to AI API...');
    
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/tunedModels/filmyorum-yspfv0rkgqw8:generateContent?key=AIzaSyDVOEaREiL05IH2lJPTdksnaqREKrGSfw8",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: "Explain how AI works" }]
          }]
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testAIAPI();