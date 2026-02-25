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

export function generateRoadmap(aiOutput: any) {

if (!aiOutput?.valid)
return [];


const stack = aiOutput.techStack || {};


return [

{
step: 1,
title: "Design system architecture",
tool: "Eraser AI",
toolLink: "https://eraser.io"
},

{
step: 2,
title: `Build frontend using ${stack.frontend || "recommended frontend"}`,
tool: "v0.dev",
toolLink: "https://v0.dev"
},

{
step: 3,
title: `Build backend using ${stack.backend || "recommended backend"}`,
tool: "Supabase",
toolLink: "https://supabase.com"
},

{
step: 4,
title: `Deploy using ${stack.deployment || "recommended platform"}`,
tool: "Vercel",
toolLink: "https://vercel.com"
}

];

}
