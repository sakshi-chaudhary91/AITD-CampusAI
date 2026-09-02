from google import genai
from google.genai import types

from app.core.config import GEMINI_API_KEY, MODEL_NAME


client = genai.Client(
    api_key=GEMINI_API_KEY
)


def get_gemini_response(context: str, question: str):

    prompt = f"""
You are AITD CampusAI.

Answer the student's question using ONLY the CONTEXT below.

IMPORTANT:
- Give the complete answer.
- Do not stop in the middle of a sentence.
- If the context contains a list, provide the complete relevant list.
- Keep each point short.
- Do not explain your reasoning.
- Do not use outside knowledge.
- Do not write an introduction.

If the answer is not available in the context, reply exactly:
I couldn't find this information in the uploaded documents.

CONTEXT:
{context}

QUESTION:
{question}

ANSWER:
"""

    try:

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
            config=types.GenerateContentConfig(
                max_output_tokens=1000,
                temperature=0.1
            )
        )

        if not response.candidates:
            return "I couldn't generate an answer."

        candidate = response.candidates[0]

        if not candidate.content:
            return "I couldn't generate an answer."

        if not candidate.content.parts:
            return "I couldn't generate an answer."

        answer = ""

        for part in candidate.content.parts:
            if part.text:
                answer += part.text

        answer = answer.strip()

        if not answer:
            return "I couldn't generate an answer."

        return answer

    except Exception as e:

        print("Gemini Error:", str(e))

        return f"Error: {str(e)}"