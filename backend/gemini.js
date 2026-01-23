import axios from "axios";

const geminiResponse = async (prompt) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL;

    const response = await axios.post(
      apiUrl,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Gemini API Error:",
      error.response?.data || error.message
    );
  }
};

export default geminiResponse;
