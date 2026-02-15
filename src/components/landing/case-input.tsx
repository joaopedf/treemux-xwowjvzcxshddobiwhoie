"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Send,
  Loader2,
  FlaskConical,
  ChevronRight,
} from "lucide-react";
import { DEMO_CASES } from "@/lib/demo-data";

interface CaseInputProps {
  onSubmit: (input: string, demoId?: string) => void;
  isLoading: boolean;
}

export function CaseInput({ onSubmit, isLoading }: CaseInputProps) {
  const [input, setInput] = useState("");
  const [showExamples, setShowExamples] = useState(true);

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSubmit(input.trim());
    }
  };

  const handleDemoCase = (demoCase: (typeof DEMO_CASES)[0]) => {
    setInput(demoCase.input);
    setShowExamples(false);
    onSubmit(demoCase.input, demoCase.id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      {/* Demo case cards */}
      <AnimatePresence>
        {showExamples && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <FlaskConical className="w-4 h-4 text-[oklch(0.75_0.15_185)]" />
              <span className="text-sm font-mono text-muted-foreground tracking-wide uppercase">
                Demo Cases
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {DEMO_CASES.map((demo, i) => (
                <motion.button
                  key={demo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  onClick={() => handleDemoCase(demo)}
                  disabled={isLoading}
                  className="group text-left p-4 rounded-lg border border-border bg-card/50 hover:bg-[oklch(0.17_0.015_220)] hover:border-[oklch(0.75_0.15_185/30%)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">
                        {demo.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {demo.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[oklch(0.75_0.15_185)] transition-colors shrink-0 mt-0.5" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative"
      >
        <div className="relative rounded-lg border border-border bg-card/80 backdrop-blur-sm overflow-hidden glow-teal">
          {/* Header bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-[oklch(0.12_0.01_220)]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.65_0.2_25)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.8_0.15_85)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.7_0.15_155)]" />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
              Patient Case Input
            </span>
            <div className="w-16" />
          </div>

          <Textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (showExamples && e.target.value.length > 0) {
                setShowExamples(false);
              } else if (!showExamples && e.target.value.length === 0) {
                setShowExamples(true);
              }
            }}
            placeholder="Describe a patient case in natural language... e.g., '45-year-old female presents with acute onset right lower quadrant abdominal pain, nausea, and fever of 101.3°F for the past 12 hours...'"
            className="min-h-[160px] resize-none border-0 bg-transparent text-sm leading-relaxed placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0 p-4 font-mono"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                handleSubmit();
              }
            }}
          />

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-[oklch(0.12_0.01_220)]">
            <span className="text-[10px] font-mono text-muted-foreground">
              {input.length > 0
                ? `${input.length} chars`
                : "Cmd/Ctrl + Enter to submit"}
            </span>
            <Button
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              size="sm"
              className="bg-[oklch(0.75_0.15_185)] text-[oklch(0.1_0.01_220)] hover:bg-[oklch(0.8_0.15_185)] font-mono text-xs tracking-wider uppercase gap-2 px-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Analyzing
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Analyze Case
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
