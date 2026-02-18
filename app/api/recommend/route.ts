import { NextRequest, NextResponse } from 'next/server'

type Tool = {
  id: string
  name: string
  category: string
  description: string
  link: string
  prompt: string
}

const TOOL_MAP: Record<string, Tool[]> = {

  architecture: [
    {
      id: "eraser_ai",
      name: "Eraser AI",
      category: "architecture",
      description: "Create system architecture and flow diagrams",
      link: "https://eraser.io",
      prompt: "Create a high-level system architecture diagram:"
    }
  ],

  ui: [
    {
      id: "v0_dev",
      name: "v0.dev",
      category: "ui",
      description: "Generate modern UI components using AI",
      link: "https://v0.dev",
      prompt: "Generate frontend UI:"
    }
  ],

  backend: [
    {
      id: "supabase_backend",
      name: "Supabase",
      category: "backend",
      description: "Backend with authentication and APIs",
      link: "https://supabase.com",
      prompt: "Create backend with authentication:"
    }
  ],

  database: [
    {
      id: "supabase_db",
      name: "Supabase Database",
      category: "database",
      description: "PostgreSQL scalable database",
      link: "https://supabase.com",
      prompt: "Design database schema:"
    }
  ],

  deployment: [
    {
      id: "vercel",
      name: "Vercel",
      category: "deployment",
      description: "Deploy full-stack apps",
      link: "https://vercel.com",
      prompt: "Deploy application:"
    }
  ]

}


export async function POST(request: NextRequest) {

  try {

    const body = await request.json()

    const requirements = body.requirements

    if (!requirements || !Array.isArray(requirements)) {

      return NextResponse.json(
        { success: false, error: "Invalid requirements" },
        { status: 400 }
      )

    }


    const recommendations: Tool[] = []


    for (const requirement of requirements) {

      const key = requirement.toLowerCase().trim()

      const tools = TOOL_MAP[key]

      if (tools) {

        recommendations.push(...tools)

      }

    }


    const uniqueRecommendations = Array.from(
      new Map(recommendations.map(tool => [tool.id, tool])).values()
    )


    return NextResponse.json({

      success: true,

      tools: uniqueRecommendations,

      count: uniqueRecommendations.length

    })


  }

  catch (error) {

    console.error(error)

    return NextResponse.json(

      { success: false, error: "Internal server error" },

      { status: 500 }

    )

  }

}



export async function GET() {

  return NextResponse.json(

    { success: false, error: "GET not allowed" },

    { status: 405 }

  )

}
