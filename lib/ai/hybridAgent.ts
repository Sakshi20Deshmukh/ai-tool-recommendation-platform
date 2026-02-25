export async function analyzePromptWithHybridAgent(prompt: string) {

try {

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAQURTMv6wP3oyUHwX_ePaCYRl4Sn2dGwQ`,
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({

contents: [
{
parts: [
{
text: `
You are an AI system.

Analyze this project idea:

"${prompt}"

Return ONLY JSON in this format:

{
"valid": true,
"domain": "web | mobile | ai | data",
"requirements": ["frontend","backend","database","deployment"],
"techStack": ["example"]
}

DO NOT WRITE ANYTHING ELSE.
`
}
]
}
]

})

})

const data = await response.json()

// Gemini response format
const text = data.candidates[0].content.parts[0].text

const jsonStart = text.indexOf("{")
const jsonEnd = text.lastIndexOf("}") + 1

const jsonString = text.slice(jsonStart, jsonEnd)

return JSON.parse(jsonString)

}

catch(error){

return {

valid: true,

domain: "web",

requirements: ["frontend","backend","database","deployment"],

techStack: []

}

}

}