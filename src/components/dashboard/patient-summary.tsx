"use client";

import { motion } from "framer-motion";
import {
  User,
  HeartPulse,
  Pill,
  AlertCircle,
  FileText,
  Thermometer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PatientCase } from "@/lib/types";

interface PatientSummaryProps {
  patient: PatientCase;
}

export function PatientSummary({ patient }: PatientSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-lg border border-border bg-card/50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-[oklch(0.12_0.01_220)]">
        <User className="w-4 h-4 text-[oklch(0.75_0.15_185)]" />
        <h2 className="text-sm font-semibold tracking-wide uppercase">
          Patient Summary
        </h2>
      </div>

      <div className="p-5 space-y-4">
        {/* Demographics */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">
              AGE
            </span>
            <span className="text-sm font-semibold text-foreground">
              {patient.age}
            </span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">
              SEX
            </span>
            <span className="text-sm font-semibold text-foreground">
              {patient.sex}
            </span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">
              DURATION
            </span>
            <span className="text-sm font-semibold text-foreground">
              {patient.duration}
            </span>
          </div>
        </div>

        {/* Chief complaint */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <FileText className="w-3.5 h-3.5 text-[oklch(0.75_0.15_185)]" />
            <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
              Chief Complaint
            </span>
          </div>
          <p className="text-sm text-foreground font-medium pl-5">
            {patient.chiefComplaint}
          </p>
        </div>

        {/* Symptoms */}
        <div>
          <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase flex items-center gap-2 mb-2">
            <HeartPulse className="w-3.5 h-3.5 text-[oklch(0.7_0.15_155)]" />
            Symptoms
          </span>
          <div className="flex flex-wrap gap-1.5 pl-5">
            {patient.symptoms.map((s, i) => (
              <Badge
                key={i}
                variant="outline"
                className="text-[10px] font-normal"
              >
                {s}
              </Badge>
            ))}
          </div>
        </div>

        {/* Vital Signs */}
        {patient.vitalSigns && (
          <div>
            <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase flex items-center gap-2 mb-2">
              <Thermometer className="w-3.5 h-3.5 text-[oklch(0.8_0.15_85)]" />
              Vital Signs
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pl-5">
              {patient.vitalSigns.bloodPressure && (
                <div className="rounded-md border border-border bg-secondary/30 p-2 text-center">
                  <div className="text-[10px] font-mono text-muted-foreground">
                    BP
                  </div>
                  <div className="text-sm font-bold font-mono text-foreground">
                    {patient.vitalSigns.bloodPressure}
                  </div>
                </div>
              )}
              {patient.vitalSigns.heartRate && (
                <div className="rounded-md border border-border bg-secondary/30 p-2 text-center">
                  <div className="text-[10px] font-mono text-muted-foreground">
                    HR
                  </div>
                  <div className="text-sm font-bold font-mono text-foreground">
                    {patient.vitalSigns.heartRate}
                  </div>
                </div>
              )}
              {patient.vitalSigns.temperature && (
                <div className="rounded-md border border-border bg-secondary/30 p-2 text-center">
                  <div className="text-[10px] font-mono text-muted-foreground">
                    Temp
                  </div>
                  <div className="text-sm font-bold font-mono text-foreground">
                    {patient.vitalSigns.temperature}°F
                  </div>
                </div>
              )}
              {patient.vitalSigns.respiratoryRate && (
                <div className="rounded-md border border-border bg-secondary/30 p-2 text-center">
                  <div className="text-[10px] font-mono text-muted-foreground">
                    RR
                  </div>
                  <div className="text-sm font-bold font-mono text-foreground">
                    {patient.vitalSigns.respiratoryRate}
                  </div>
                </div>
              )}
              {patient.vitalSigns.oxygenSaturation && (
                <div className="rounded-md border border-border bg-secondary/30 p-2 text-center">
                  <div className="text-[10px] font-mono text-muted-foreground">
                    SpO2
                  </div>
                  <div className="text-sm font-bold font-mono text-foreground">
                    {patient.vitalSigns.oxygenSaturation}%
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Medications & Allergies row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase flex items-center gap-2 mb-2">
              <Pill className="w-3.5 h-3.5 text-[oklch(0.8_0.15_85)]" />
              Current Medications
            </span>
            {patient.medications.length > 0 ? (
              <ul className="space-y-1 pl-5">
                {patient.medications.map((m, i) => (
                  <li
                    key={i}
                    className="text-xs text-foreground/80 flex items-start gap-2"
                  >
                    <span className="text-[oklch(0.8_0.15_85)] mt-0.5">
                      &bull;
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground pl-5 italic">
                No current medications
              </p>
            )}
          </div>
          <div>
            <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase flex items-center gap-2 mb-2">
              <AlertCircle className="w-3.5 h-3.5 text-[oklch(0.65_0.2_25)]" />
              Allergies
            </span>
            {patient.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pl-5">
                {patient.allergies.map((a, i) => (
                  <Badge
                    key={i}
                    variant="destructive"
                    className="text-[10px]"
                  >
                    {a}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs pl-5 font-mono text-[oklch(0.7_0.15_155)]">
                NKDA
              </p>
            )}
          </div>
        </div>

        {/* Medical History */}
        {patient.medicalHistory.length > 0 && (
          <div>
            <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-2 block">
              Medical History
            </span>
            <div className="flex flex-wrap gap-1.5 pl-0">
              {patient.medicalHistory.map((h, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="text-[10px] font-normal"
                >
                  {h}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
