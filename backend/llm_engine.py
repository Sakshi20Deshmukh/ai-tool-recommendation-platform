import os
import json
from google import genai

def generate_project(prompt: str):
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY missing")

        client = genai.Client(api_key=api_key)

        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=prompt,
            config={
                "system_instruction": (
                    "You are an expert AI software architect. "
                    "Return ONLY valid JSON in this format:\n"
                    "{"
                    "\"analysis\": {\"project_type\": [], \"domain\": [], \"difficulty\": \"\"},"
                    "\"tools\": [],"
                    "\"roadmap\": [],"
                    "\"components\": []"
                    "}"
                )
            }
        )

        text = response.text
        start = text.find("{")
        end = text.rfind("}") + 1
        return json.loads(text[start:end])

    except Exception as e:
        return {
            "analysis": {"project_type": [], "domain": [], "difficulty": ""},
            "tools": [],
            "roadmap": [],
            "components": ["Unable to generate project. Please try a clearer prompt."]
        }