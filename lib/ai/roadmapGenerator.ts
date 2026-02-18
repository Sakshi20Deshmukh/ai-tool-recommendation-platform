type RoadmapStep = {
  step: number;
  title: string;
  tool: string;
  toolLink: string;
};

type AIOutput = {
  valid: boolean;
  requirements: string[];
};

type Tool = {
  name: string;
  category: string;
  url: string;
};

export function generateRoadmap(
  aiOutput: AIOutput,
  tools: Tool[]
): RoadmapStep[] {

  // ✅ Safety check
  if (!aiOutput || !aiOutput.valid) return [];

  if (!Array.isArray(aiOutput.requirements)) return [];

  const roadmap: RoadmapStep[] = [];

  const stepMap: Record<string, string> = {

  architecture: "Design system architecture",

  ui: "Build frontend UI",

  backend: "Setup backend",

  database: "Setup database",

  deployment: "Deploy application",

  "AI": "Integrate AI features"

};


  aiOutput.requirements.forEach((req, index) => {

  const tool = tools.find(
  t => t.category.toLowerCase() === req.toLowerCase()
  );

    // ✅ ONLY push if tool exists OR fallback safely
    roadmap.push({

      step: index + 1,

      title: stepMap[req] || `Setup ${req}`,

      tool: tool ? tool.name : "Manual Setup",

      toolLink: tool ? tool.url : "#"

    });

  });

  return roadmap;

}
