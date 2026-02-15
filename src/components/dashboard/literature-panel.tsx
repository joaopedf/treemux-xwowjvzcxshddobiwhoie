"use client";

import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LiteratureReference } from "@/lib/types";

interface LiteraturePanelProps {
  references: LiteratureReference[];
}

export function LiteraturePanel({ references }: LiteraturePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-lg border border-border bg-card/50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-[oklch(0.12_0.01_220)]">
        <BookOpen className="w-4 h-4 text-[oklch(0.6_0.2_300)]" />
        <h2 className="text-sm font-semibold tracking-wide uppercase">
          Evidence & Literature
        </h2>
        <Badge variant="secondary" className="ml-auto text-[10px] font-mono">
          {references.length} citations
        </Badge>
      </div>

      <div className="divide-y divide-border">
        {references.map((ref, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            className="p-4 hover:bg-[oklch(0.15_0.012_220)] transition-colors"
          >
            {/* Title and year */}
            <div className="flex items-start gap-3">
              <span className="text-xs font-mono text-muted-foreground shrink-0 mt-0.5">
                [{i + 1}]
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground leading-snug flex items-start gap-2">
                  <span>{ref.title}</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0 mt-1" />
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {ref.authors}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="italic">{ref.journal}</span> ({ref.year})
                </p>

                {/* Evidence level */}
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="outline"
                    className="text-[10px] font-mono text-[oklch(0.6_0.2_300)] border-[oklch(0.6_0.2_300/30%)]"
                  >
                    {ref.evidenceLevel}
                  </Badge>
                </div>

                {/* Key finding */}
                <div className="mt-2 p-2 rounded border border-dashed border-border bg-secondary/20">
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    <span className="text-[oklch(0.6_0.2_300)] font-mono font-semibold">
                      Key Finding:{" "}
                    </span>
                    {ref.keyFinding}
                  </p>
                </div>

                {/* Relevance */}
                <p className="text-xs text-muted-foreground mt-2 italic">
                  {ref.relevance}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
