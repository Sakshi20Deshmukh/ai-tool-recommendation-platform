import os
import json
from google import genai

def generate_project(prompt: str):
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found")

        genai.configure(api_key=api_key)

        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction="""
You are an expert AI software architect.
Return ONLY raw JSON. No text. No markdown.
"""
        )

        response = model.generate_content(prompt)

        print("RAW LLM RESPONSE:", response)
        print("RAW LLM TEXT:", response.text)

        raw = response.text
        if not raw:
            raise ValueError("Empty response from Gemini")

        start = raw.find("{")
        end = raw.rfind("}") + 1

        json_text = raw[start:end]
        return json.loads(json_text)

    except Exception as e:
        print("LLM ERROR:", e)
        return {
            "analysis": {"project_type": [], "domain": [], "difficulty": ""},
            "tools": [],
            "roadmap": [],
            "components": ["Unable to generate project. Please try a clearer prompt."]
        }