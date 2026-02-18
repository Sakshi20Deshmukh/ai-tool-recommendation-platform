'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react'
import Link from 'next/link'
import ToolCard from '@/components/ToolCard'
import RoadmapTimeline from "@/components/RoadmapTimeline"
import { generateRoadmap } from "@/lib/ai/roadmapGenerator";

interface Tool {
  id: string
  name: string
  category: string
  useCase: string
  link: string
  description?: string
  icon?: string
}


export default function ResultsPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [hasAIOutput, setHasAIOutput] = useState(false)

useEffect(() => {

  // Load recommended tools
  const storedTools = localStorage.getItem('recommendedTools');

  let parsedTools = [];

  if (storedTools) {
    try {
      parsedTools = JSON.parse(storedTools);
      setTools(Array.isArray(parsedTools) ? parsedTools : []);
    } catch (err) {
      console.error('Failed to parse tools:', err);
      setTools([]);
    }
  }

  // Load AI output
  const storedAIOutput = localStorage.getItem('aiOutput');

  let parsedAIOutput = null;

  if (storedAIOutput) {
    try {
      parsedAIOutput = JSON.parse(storedAIOutput);
      setHasAIOutput(true);
    } catch (err) {
      console.error("Failed to parse AI Output", err);
    }
  }

  // ✅ GENERATE ROADMAP CORRECTLY
  if (parsedAIOutput && parsedTools.length > 0) {

    const roadmap = generateRoadmap(parsedAIOutput, parsedTools);

    localStorage.setItem("roadmap", JSON.stringify(roadmap));

  }

  setLoading(false);

}, []);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-8 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </Link>

        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6"
              variants={itemVariants}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">
                AI-Powered Recommendations
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl font-bold mb-4"
              variants={itemVariants}
            >
              Your Perfect Toolkit
            </motion.h1>
          </motion.div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-32">
              <p>Loading...</p>
            </div>
          )}

          {/* TOOL CARDS */}
          {!loading && tools.length > 0 && (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {tools.map((tool, idx) => (
                    <ToolCard key={tool.id || idx} tool={tool} index={idx} />
                  ))}
                </div>
              </motion.div>


              {/* ✅ ROADMAP SECTION */}
              {hasAIOutput && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="border-t border-primary/20 pt-12"
                >
                  <RoadmapTimeline />
                </motion.div>
              )}

            </>
          )}

          {/* EMPTY STATE */}
          {!loading && tools.length === 0 && (
            <div className="text-center py-32">
              <h2 className="text-2xl font-bold mb-4">
                No Recommendations Yet
              </h2>
              <Link
                href="/build"
                className="px-6 py-3 bg-primary text-white rounded-lg"
              >
                Start Searching
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
