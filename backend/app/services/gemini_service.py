from google import genai

from app.core.config import GEMINI_API_KEY, MODEL_NAME

client = genai.Client(api_key=GEMINI_API_KEY)


def get_gemini_response(context: str, question: str):
    prompt = f"""
You are AITD Smart Campus Assistant.

Answer ONLY from the provided context.
If the answer is not available in the context, reply:
"I couldn't find this information in the uploaded documents."

Context:
{context}

Question:
{question}

Answer:
"""

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )
        return response.text

    except Exception as e:
        return f"Error: {str(e)}"