import { matchTools } from "@/lib/ai/toolMatcher";
import { generateRoadmap } from "@/lib/ai/roadmapGenerator";

export async function POST(req: Request) {

  try {

    const aiOutput = await req.json();

    // ❌ If invalid prompt → stop
    if (!aiOutput || !aiOutput.valid) {

      return Response.json([]);

    }

    // ✅ Match tools
    const tools = matchTools(aiOutput) || [];

    // ✅ Generate roadmap
    const roadmap = generateRoadmap(aiOutput, tools) || [];

    // ✅ SAFETY: Always return array
    if (!Array.isArray(roadmap)) {

      console.error("Invalid roadmap format");

      return Response.json([]);

    }

    return Response.json(roadmap);

  }

  catch (error) {

    console.error("Roadmap API error:", error);

    return Response.json([]);

  }

}
