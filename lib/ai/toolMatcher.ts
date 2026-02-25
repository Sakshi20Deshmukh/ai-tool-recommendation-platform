import tools from "@/data/tools.json";

export interface AIOutput {

  valid: boolean;

  domain?: string;

  requirements?: string[];

  techStack?: string[];

  level?: string;

}

export function matchTools(aiOutput: any) {

try {

if (!aiOutput || !aiOutput.valid)
return [];


// If AI recommended tools exist → use them

if (
aiOutput.recommendedTools &&
Array.isArray(aiOutput.recommendedTools)
) {

return aiOutput.recommendedTools.map((tool: any) => ({

name: tool.toolName || "Unknown Tool",

category: tool.category || "general",

reason: tool.reason || ""

}));

}


// fallback → use tech stack

const tools = [];

if (aiOutput.techStack?.frontend)
tools.push({

name: aiOutput.techStack.frontend,

category: "frontend"

});

if (aiOutput.techStack?.backend)
tools.push({

name: aiOutput.techStack.backend,

category: "backend"

});

if (aiOutput.techStack?.database)
tools.push({

name: aiOutput.techStack.database,

category: "database"

});

if (aiOutput.techStack?.deployment)
tools.push({

name: aiOutput.techStack.deployment,

category: "deployment"

});


return tools;


}

catch (error) {

console.error("Tool matcher error:", error);

return [];

}

}
