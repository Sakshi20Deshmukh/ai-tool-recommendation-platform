import tools from "@/data/tools.json";

export interface AIOutput {

  valid: boolean;

  domain?: string;

  requirements?: string[];

  techStack?: string[];

  level?: string;

}


export function matchTools(aiOutput: AIOutput) {

  if (!aiOutput.valid) {

    return [];

  }

  const requirements = aiOutput.requirements || [];

  const techStack = aiOutput.techStack || [];

  const level = aiOutput.level || "";



  const matchedTools = tools.filter((tool: any) => {

    const categoryMatch =

      requirements.includes(tool.category);



    const stackMatch =

      techStack.length === 0 ||

      techStack.some((tech: string) =>

        tool.techStack?.includes(tech)

      );



    const levelMatch =

      !level ||

      tool.projectLevel?.includes(level);



    return categoryMatch && stackMatch && levelMatch;

  });



  return matchedTools;

}
