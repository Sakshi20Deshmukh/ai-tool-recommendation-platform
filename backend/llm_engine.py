import os
import json

def generate_project(prompt):
    try:
        import google.generativeai as genai

        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            return None  # fallback if no key

        genai.configure(api_key=api_key)

        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction="""
You are an expert AI software architect.

Return ONLY valid JSON in this exact format:
{
  "analysis": {
    "project_type": [],
    "domain": [],
    "difficulty": ""
  },
  "tools": [],
  "roadmap": [],
  "components": []
}
"""
        )

        response = model.generate_content(prompt)
        return json.loads(response.text)

    except Exception as e:
        print("LLM ERROR:", e)
        return None