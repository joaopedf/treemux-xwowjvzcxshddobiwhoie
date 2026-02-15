"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Stethoscope,
  Pill,
  BookOpen,
  ShieldAlert,
  Activity,
} from "lucide-react";

const agents = [
  { icon: Brain, label: "Case Parser", color: "text-[oklch(0.75_0.15_185)]" },
  {
    icon: Stethoscope,
    label: "Diagnostician",
    color: "text-[oklch(0.7_0.15_155)]",
  },
  { icon: Pill, label: "Treatment AI", color: "text-[oklch(0.8_0.15_85)]" },
  {
    icon: ShieldAlert,
    label: "Interaction Check",
    color: "text-[oklch(0.65_0.2_25)]",
  },
  {
    icon: BookOpen,
    label: "Literature Search",
    color: "text-[oklch(0.6_0.2_300)]",
  },
];

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Animated scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[oklch(0.75_0.15_185/40%)] to-transparent animate-scan" />
      </div>

      <div className="relative z-10 flex flex-col items-center pt-20 pb-12 px-6">
        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.75_0.15_185/30%)] bg-[oklch(0.75_0.15_185/8%)] mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-[oklch(0.75_0.15_185)] animate-data-pulse" />
          <span className="text-xs font-mono text-[oklch(0.75_0.15_185)] tracking-wider uppercase">
            5 AI Agents Online
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
            <span className="text-[oklch(0.75_0.15_185)]">Med</span>
            <span className="text-foreground">Scope</span>
            <span className="text-[oklch(0.75_0.15_185/60%)] font-light ml-2 text-3xl md:text-5xl">
              AI
            </span>
          </h1>
          <div className="h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-[oklch(0.75_0.15_185)] to-transparent my-4" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Multi-agent clinical reasoning engine. Describe a patient case in
            natural language — five specialized AI agents collaboratively
            analyze, diagnose, and plan.
          </p>
        </motion.div>

        {/* Agent chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {agents.map((agent, i) => (
            <motion.div
              key={agent.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-card/50 backdrop-blur-sm"
            >
              <agent.icon className={`w-3.5 h-3.5 ${agent.color}`} />
              <span className="text-xs font-mono text-muted-foreground">
                {agent.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative vital sign */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 flex items-center gap-1 text-[oklch(0.75_0.15_185/30%)]"
        >
          <Activity className="w-4 h-4" />
          <svg width="200" height="30" viewBox="0 0 200 30" className="opacity-40">
            <polyline
              fill="none"
              stroke="oklch(0.75 0.15 185)"
              strokeWidth="1.5"
              points="0,15 20,15 30,15 35,5 40,25 45,10 50,20 55,15 75,15 95,15 105,15 110,5 115,25 120,10 125,20 130,15 150,15 170,15 180,15 185,5 190,25 195,10 200,15"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="400"
                to="0"
                dur="3s"
                fill="freeze"
              />
              <set
                attributeName="stroke-dasharray"
                to="400"
              />
            </polyline>
          </svg>
          <Activity className="w-4 h-4" />
        </motion.div>
      </div>
    </div>
  );
}
