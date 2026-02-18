"use client";

import { useEffect, useState } from "react";

type RoadmapStep = {
  step: number;
  title: string;
  tool: string;
  toolLink: string;
};

export default function RoadmapTimeline() {

  const [roadmap, setRoadmap] = useState<RoadmapStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const aiOutputRaw = localStorage.getItem("aiOutput");

    if (!aiOutputRaw) {
      setLoading(false);
      return;
    }

    const aiOutput = JSON.parse(aiOutputRaw);

    if (!aiOutput.valid) {
      setLoading(false);
      return;
    }

    fetch("/api/roadmap", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(aiOutput),

    })
      .then((res) => res.json())
      .then((data) => {

        // Safety check
        if (Array.isArray(data)) {

          setRoadmap(data);

        } else {

          console.error("Invalid roadmap format:", data);

        }

      })
      .catch((err) => {

        console.error("Roadmap error:", err);

      })
      .finally(() => {

        setLoading(false);

      });

  }, []);

  // Loading state
  if (loading)
    return (
      <div className="mt-12 text-primary/60">
        Generating roadmap...
      </div>
    );

  // Empty state
  if (!roadmap.length)
    return (
      <div className="mt-12 text-primary/60">
        No roadmap generated
      </div>
    );

  return (

    <div className="mt-12">

      <h2 className="text-2xl font-bold mb-6">

        AI Project Roadmap

      </h2>

      <div className="space-y-4">

        {roadmap.map((step) => (

          <div
            key={step.step}
            className="flex gap-4 items-center border border-primary/20 p-4 rounded-lg bg-primary/5"
          >

            <div className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full font-bold">

              {step.step}

            </div>

            <div>

              <div className="font-semibold">

                {step.title}

              </div>

              <a
                href={step.toolLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 underline"
              >

                {step.tool}

              </a>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}
