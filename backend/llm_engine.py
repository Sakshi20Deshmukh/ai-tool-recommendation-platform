import os
import json
import google.generativeai as genai


def generate_project(prompt: str):
    try:
        # 1️⃣ Get API key
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found")

        # 2️⃣ Configure Gemini
        genai.configure(api_key=api_key)

        # 3️⃣ Create model
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction="""
You are an expert AI software architect.

You MUST return ONLY valid JSON.
No explanations. No markdown. No extra text.

Return exactly this structure:
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

        # 4️⃣ Generate response
        response = model.generate_content(prompt)

        # 5️⃣ Clean + parse JSON safely
        text = response.text.strip()

        # Handle accidental markdown
        if text.startswith("```"):
            text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as e:
        print("LLM ERROR:", str(e))

        # 6️⃣ Safe fallback (frontend never crashes)
        return {
            "analysis": {
                "project_type": [],
                "domain": [],
                "difficulty": ""
            },
            "tools": [],
            "roadmap": [],
            "components": [
                "Unable to generate project. Please try a clearer prompt."
            ]
        }