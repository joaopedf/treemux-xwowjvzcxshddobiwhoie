import type { ClinicalAnalysis } from "./types";

export const DEMO_CASES = [
  {
    id: "chest-pain",
    title: "Acute Chest Pain",
    description: "55yo male with crushing chest pain and shortness of breath",
    input: `55-year-old male presents to the emergency department with acute onset crushing substernal chest pain radiating to the left arm for the past 2 hours. Pain is 8/10, associated with diaphoresis and shortness of breath. Patient has a history of hypertension, type 2 diabetes, and hyperlipidemia. Current medications include metformin 1000mg BID, lisinopril 20mg daily, and atorvastatin 40mg daily. No known drug allergies. Vitals: BP 160/95, HR 102, Temp 98.6°F, RR 22, SpO2 94% on room air. ECG shows ST elevation in leads II, III, aVF.`,
  },
  {
    id: "headache",
    title: "Severe Headache",
    description: "32yo female with sudden worst headache of her life",
    input: `32-year-old female presents with sudden onset of the "worst headache of my life" that started 3 hours ago. She describes it as a thunderclap headache, rated 10/10, located occipitally with neck stiffness. She has nausea and vomiting, and photophobia. She has a history of migraines but says this is completely different from her usual headaches. She takes sumatriptan as needed for migraines and oral contraceptive pills. No known allergies. She is a smoker (10 pack-years). Vitals: BP 175/100, HR 88, Temp 99.8°F, RR 16, SpO2 99%.`,
  },
  {
    id: "pediatric-fever",
    title: "Pediatric Fever",
    description: "4yo with high fever, rash, and irritability for 5 days",
    input: `4-year-old male brought in by parents with high fever up to 104°F for 5 consecutive days. He has bilateral conjunctival injection without exudate, cracked red lips, a strawberry tongue, diffuse erythematous rash on his trunk, and swelling of his hands and feet. He is extremely irritable. Past medical history is unremarkable. No current medications. Allergic to amoxicillin (rash). Vitals: Temp 103.8°F, HR 140, RR 28, BP 85/55, SpO2 98%. Labs show elevated ESR 65, CRP 8.2, WBC 15,000, platelets 450,000.`,
  },
];

export const DEMO_RESULTS: Record<string, ClinicalAnalysis> = {
  "chest-pain": {
    parsedCase: {
      chiefComplaint: "Acute crushing substernal chest pain radiating to left arm",
      symptoms: [
        "Crushing substernal chest pain",
        "Left arm radiation",
        "Diaphoresis",
        "Shortness of breath",
      ],
      duration: "2 hours",
      medicalHistory: [
        "Hypertension",
        "Type 2 Diabetes Mellitus",
        "Hyperlipidemia",
      ],
      medications: [
        "Metformin 1000mg BID",
        "Lisinopril 20mg daily",
        "Atorvastatin 40mg daily",
      ],
      allergies: [],
      age: 55,
      sex: "Male",
      vitalSigns: {
        bloodPressure: "160/95",
        heartRate: 102,
        temperature: 98.6,
        respiratoryRate: 22,
        oxygenSaturation: 94,
      },
      additionalNotes:
        "ECG shows ST elevation in leads II, III, aVF. Patient appears diaphoretic and in acute distress.",
    },
    differentialDiagnoses: [
      {
        name: "ST-Elevation Myocardial Infarction (STEMI) — Inferior",
        icdCode: "I21.19",
        confidence: 95,
        reasoning:
          "Classic presentation with crushing substernal chest pain radiating to left arm, diaphoresis, and ST elevation in inferior leads (II, III, aVF). Multiple cardiac risk factors present (HTN, DM2, hyperlipidemia, age, male sex). This is the most likely and most dangerous diagnosis requiring emergent intervention.",
        keyFindings: [
          "ST elevation in leads II, III, aVF",
          "Crushing substernal chest pain with radiation",
          "Diaphoresis",
          "Multiple cardiovascular risk factors",
          "Tachycardia (HR 102)",
          "Hypoxia (SpO2 94%)",
        ],
        redFlags: [
          "Emergent condition — requires immediate PCI or thrombolysis",
          "Monitor for cardiogenic shock",
          "Watch for right ventricular involvement",
          "Risk of fatal arrhythmias (VT/VF)",
        ],
      },
      {
        name: "Unstable Angina / NSTEMI",
        icdCode: "I20.0",
        confidence: 60,
        reasoning:
          "While ST elevation points toward STEMI, the clinical picture could also represent an evolving acute coronary syndrome. Troponin levels would help differentiate. The presence of ST changes makes this less likely than STEMI but still in the differential.",
        keyFindings: [
          "Chest pain at rest",
          "Cardiovascular risk factors",
          "Hemodynamic instability",
        ],
        redFlags: [
          "Could evolve into STEMI",
          "Need serial troponins",
          "Risk of sudden cardiac death",
        ],
      },
      {
        name: "Aortic Dissection",
        icdCode: "I71.01",
        confidence: 15,
        reasoning:
          "Severe chest pain with hypertension should raise concern for aortic dissection, particularly in a patient with chronic hypertension. However, the tearing/ripping quality is not described, and ECG shows ST changes more consistent with ACS.",
        keyFindings: [
          "Severe chest pain",
          "Hypertension (160/95)",
          "History of chronic hypertension",
        ],
        redFlags: [
          "Must rule out before anticoagulation for STEMI",
          "Check bilateral blood pressures",
          "CT angiography if clinical suspicion",
        ],
      },
      {
        name: "Pulmonary Embolism",
        icdCode: "I26.99",
        confidence: 10,
        reasoning:
          "Shortness of breath and tachycardia with chest pain could represent PE. However, the ST elevation pattern and classic cardiac presentation make this less likely. SpO2 of 94% is concerning but can be explained by cardiac failure.",
        keyFindings: [
          "Tachycardia",
          "Hypoxia",
          "Dyspnea",
          "Chest pain",
        ],
        redFlags: [
          "D-dimer if PE still suspected after STEMI workup",
          "Consider CTPA if diagnosis uncertain",
        ],
      },
      {
        name: "Tension Pneumothorax",
        icdCode: "J93.0",
        confidence: 5,
        reasoning:
          "Acute chest pain with dyspnea and tachycardia. However, no trauma history, no decreased breath sounds described, and ECG findings are more consistent with cardiac pathology.",
        keyFindings: [
          "Acute onset chest pain",
          "Dyspnea",
          "Tachycardia",
        ],
        redFlags: [
          "Would present with absent breath sounds on affected side",
          "Tracheal deviation in severe cases",
        ],
      },
    ],
    treatmentPlans: [
      {
        diagnosis: "STEMI — Inferior",
        firstLine: [
          {
            name: "Aspirin",
            dosage: "325mg chewable STAT, then 81mg daily",
            route: "Oral",
            duration: "Indefinite",
            evidenceLevel: "A",
          },
          {
            name: "Ticagrelor",
            dosage: "180mg loading dose, then 90mg BID",
            route: "Oral",
            duration: "12 months",
            evidenceLevel: "A",
          },
          {
            name: "Heparin (Unfractionated)",
            dosage: "60 units/kg IV bolus (max 4000u), then 12 units/kg/hr",
            route: "IV",
            duration: "During PCI and 24-48 hours post",
            evidenceLevel: "A",
          },
          {
            name: "Nitroglycerin",
            dosage: "0.4mg sublingual q5min x3, then IV drip 5-200mcg/min",
            route: "Sublingual/IV",
            duration: "Titrate to pain relief and BP",
            evidenceLevel: "B",
          },
          {
            name: "Morphine",
            dosage: "2-4mg IV q5-15min PRN",
            route: "IV",
            duration: "As needed for pain",
            evidenceLevel: "B",
          },
        ],
        alternatives: [
          {
            name: "Clopidogrel",
            dosage: "600mg loading, 75mg daily",
            reason: "If ticagrelor unavailable or contraindicated",
          },
          {
            name: "Tenecteplase",
            dosage: "Weight-based IV bolus",
            reason:
              "If PCI not available within 120 minutes (fibrinolytic therapy)",
          },
        ],
        nonPharmacological: [
          "Emergent percutaneous coronary intervention (PCI) — door-to-balloon time <90 minutes",
          "Continuous cardiac monitoring",
          "Supplemental oxygen to maintain SpO2 >94%",
          "Bed rest with head of bed elevated",
          "12-lead ECG every 15-30 minutes",
          "Cardiac rehabilitation referral post-discharge",
        ],
        monitoring: [
          "Serial troponins q3-6 hours",
          "Continuous telemetry monitoring",
          "Repeat ECG post-intervention",
          "Echocardiogram within 24 hours",
          "Renal function (metformin consideration)",
          "Blood glucose monitoring (stress hyperglycemia)",
          "CBC with platelets (anticoagulation monitoring)",
        ],
        followUp:
          "Cardiology follow-up in 1-2 weeks post-discharge. Cardiac rehabilitation program. Optimize risk factor management: A1C target <7%, LDL <70mg/dL, BP <130/80. Smoking cessation counseling if applicable. Repeat echocardiogram at 6-8 weeks.",
      },
      {
        diagnosis: "Unstable Angina / NSTEMI",
        firstLine: [
          {
            name: "Aspirin",
            dosage: "325mg then 81mg daily",
            route: "Oral",
            duration: "Indefinite",
            evidenceLevel: "A",
          },
          {
            name: "Enoxaparin",
            dosage: "1mg/kg SC q12h",
            route: "Subcutaneous",
            duration: "Until PCI or discharge",
            evidenceLevel: "A",
          },
          {
            name: "Atorvastatin",
            dosage: "80mg daily (uptitrate from current 40mg)",
            route: "Oral",
            duration: "Indefinite",
            evidenceLevel: "A",
          },
        ],
        alternatives: [
          {
            name: "Prasugrel",
            dosage: "60mg loading, 10mg daily",
            reason: "Alternative P2Y12 inhibitor if ticagrelor not tolerated",
          },
        ],
        nonPharmacological: [
          "Risk stratification with TIMI or GRACE score",
          "Early invasive strategy within 24-72 hours",
          "Cardiac monitoring",
        ],
        monitoring: [
          "Serial troponins",
          "Continuous ECG monitoring",
          "Renal function",
        ],
        followUp:
          "Cardiology follow-up within 1 week. Stress testing if conservative management chosen.",
      },
      {
        diagnosis: "Aortic Dissection (if suspected)",
        firstLine: [
          {
            name: "Esmolol",
            dosage: "500mcg/kg IV bolus then 50-200mcg/kg/min",
            route: "IV",
            duration: "Until HR <60 and SBP <120",
            evidenceLevel: "B",
          },
          {
            name: "Nicardipine",
            dosage: "5-15mg/hr IV infusion",
            route: "IV",
            duration: "Titrate to SBP target",
            evidenceLevel: "B",
          },
        ],
        alternatives: [
          {
            name: "Labetalol",
            dosage: "20mg IV bolus, then 1-2mg/min infusion",
            reason: "Alternative beta-blocker if esmolol not available",
          },
        ],
        nonPharmacological: [
          "Emergent CT angiography for diagnosis",
          "Emergent surgical consultation for Type A dissection",
          "Strict blood pressure control",
          "Pain management (morphine preferred)",
        ],
        monitoring: [
          "Continuous arterial blood pressure monitoring",
          "Serial imaging",
          "Renal function",
          "Lactic acid",
        ],
        followUp:
          "Vascular surgery or cardiothoracic surgery management. Lifelong blood pressure control.",
      },
    ],
    drugInteractions: [
      {
        drug1: "Metformin",
        drug2: "IV Contrast (for PCI)",
        severity: "moderate",
        mechanism:
          "Risk of contrast-induced nephropathy compounded by metformin's renal elimination, potentially leading to lactic acidosis",
        clinicalEffect:
          "Increased risk of metformin-associated lactic acidosis in setting of acute kidney injury from contrast",
        recommendation:
          "Hold metformin for 48 hours before and after contrast administration. Check renal function (creatinine/GFR) before resuming.",
      },
      {
        drug1: "Aspirin",
        drug2: "Heparin",
        severity: "moderate",
        mechanism:
          "Additive anticoagulant and antiplatelet effects through different pathways",
        clinicalEffect: "Increased risk of bleeding",
        recommendation:
          "Expected combination in ACS management. Monitor for signs of bleeding. Check aPTT regularly. Appropriate in this clinical context.",
      },
      {
        drug1: "Ticagrelor",
        drug2: "Aspirin",
        severity: "mild",
        mechanism:
          "Dual antiplatelet therapy increases bleeding risk but is guideline-recommended post-ACS",
        clinicalEffect:
          "Increased risk of bleeding, particularly GI and intracranial",
        recommendation:
          "Standard of care for 12 months post-ACS. Use low-dose aspirin (81mg). Consider PPI for GI protection.",
      },
      {
        drug1: "Lisinopril",
        drug2: "Nitroglycerin",
        severity: "moderate",
        mechanism: "Additive hypotensive effect — both are vasodilators",
        clinicalEffect:
          "Risk of significant hypotension, particularly in inferior MI with RV involvement",
        recommendation:
          "Monitor blood pressure closely. May need to hold ACE inhibitor acutely. Use nitrates cautiously — contraindicated if SBP <90.",
      },
    ],
    references: [
      {
        title:
          "2023 ACC/AHA Guideline for Management of Patients With Acute Coronary Syndromes",
        authors: "Writing Committee Members et al.",
        journal: "Journal of the American College of Cardiology",
        year: 2023,
        relevance:
          "Primary guideline for management of STEMI and ACS — directly applicable to this case",
        keyFinding:
          "Primary PCI is the preferred reperfusion strategy for STEMI when door-to-balloon time <90 minutes. Dual antiplatelet therapy recommended for 12 months post-ACS.",
        evidenceLevel: "Clinical Practice Guideline",
      },
      {
        title:
          "PLATO Trial — Ticagrelor versus Clopidogrel in Patients with Acute Coronary Syndromes",
        authors: "Wallentin L, Becker RC, Budaj A, et al.",
        journal: "New England Journal of Medicine",
        year: 2009,
        relevance:
          "Landmark trial establishing ticagrelor superiority over clopidogrel in ACS",
        keyFinding:
          "Ticagrelor reduced the composite of death from vascular causes, MI, or stroke compared with clopidogrel (9.8% vs 11.7%, p<0.001) without significant increase in major bleeding.",
        evidenceLevel: "Randomized Controlled Trial (Level A)",
      },
      {
        title:
          "Fourth Universal Definition of Myocardial Infarction (2018)",
        authors:
          "Thygesen K, Alpert JS, Jaffe AS, et al.",
        journal: "Circulation",
        year: 2018,
        relevance:
          "Defines diagnostic criteria for MI — essential for accurate classification of this case",
        keyFinding:
          "Type 1 MI is characterized by acute atherothrombotic coronary artery disease with plaque rupture/erosion and intracoronary thrombus. ST-segment elevation in 2+ contiguous leads is a key diagnostic criterion.",
        evidenceLevel: "Expert Consensus Document",
      },
      {
        title:
          "ESC Guidelines for the management of acute myocardial infarction in patients presenting with ST-segment elevation",
        authors: "Ibanez B, James S, Agewall S, et al.",
        journal: "European Heart Journal",
        year: 2018,
        relevance:
          "Complementary international guidelines for STEMI management",
        keyFinding:
          "Recommends fibrinolysis within 10 minutes if PCI cannot be performed within 120 minutes of STEMI diagnosis. Radial access preferred over femoral.",
        evidenceLevel: "Clinical Practice Guideline",
      },
      {
        title:
          "CURE Trial — Clopidogrel in Unstable Angina to Prevent Recurrent Events",
        authors: "Yusuf S, Zhao F, Mehta SR, et al.",
        journal: "New England Journal of Medicine",
        year: 2001,
        relevance:
          "Foundational evidence for dual antiplatelet therapy in ACS",
        keyFinding:
          "Adding clopidogrel to aspirin reduced the composite of cardiovascular death, non-fatal MI, or stroke by 20% (RR 0.80) in patients with ACS.",
        evidenceLevel: "Randomized Controlled Trial (Level A)",
      },
    ],
    criticalAlerts: [
      "EMERGENT: ST-Elevation MI — Activate cath lab immediately. Door-to-balloon time <90 minutes.",
      "SEVERE: Monitor for cardiogenic shock — tachycardia and borderline hypoxia present",
      "RED FLAG (STEMI): Risk of fatal arrhythmias (VT/VF) — ensure defibrillator at bedside",
      "RED FLAG (STEMI): Watch for right ventricular involvement — avoid nitroglycerin if RV MI",
      "MODERATE: Hold Metformin 48h before/after contrast for PCI",
    ],
    summary:
      "55yo Male presenting with acute crushing substernal chest pain. Most likely diagnosis: ST-Elevation Myocardial Infarction — Inferior (95% confidence). 5 critical alert(s) require attention. Emergent PCI recommended.",
  },
  "headache": {
    parsedCase: {
      chiefComplaint: "Sudden onset worst headache of life (thunderclap headache)",
      symptoms: [
        "Thunderclap headache",
        "Occipital location",
        "Neck stiffness",
        "Nausea and vomiting",
        "Photophobia",
      ],
      duration: "3 hours",
      medicalHistory: ["Migraines"],
      medications: [
        "Sumatriptan PRN",
        "Oral contraceptive pills",
      ],
      allergies: [],
      age: 32,
      sex: "Female",
      vitalSigns: {
        bloodPressure: "175/100",
        heartRate: 88,
        temperature: 99.8,
        respiratoryRate: 16,
        oxygenSaturation: 99,
      },
      additionalNotes: "Smoker, 10 pack-years. Patient clearly states this headache is different from her usual migraines.",
    },
    differentialDiagnoses: [
      {
        name: "Subarachnoid Hemorrhage (SAH)",
        icdCode: "I60.9",
        confidence: 85,
        reasoning:
          "Thunderclap headache described as worst headache of life is the hallmark presentation of SAH. Neck stiffness suggests meningeal irritation from blood in the subarachnoid space. Hypertension, smoking, and OCP use are risk factors for aneurysmal SAH. This must be ruled out emergently.",
        keyFindings: [
          "Thunderclap headache — worst of life",
          "Neck stiffness (meningismus)",
          "Nausea/vomiting",
          "Hypertension",
          "Risk factors: smoking, OCP use",
          "Different from usual migraines",
        ],
        redFlags: [
          "Life-threatening emergency — mortality 40-50% if untreated",
          "Emergent non-contrast CT head required",
          "If CT negative, lumbar puncture mandatory",
          "Risk of rebleeding highest in first 24 hours",
          "Vasospasm risk peaks days 4-14",
        ],
      },
      {
        name: "Cerebral Venous Sinus Thrombosis (CVST)",
        icdCode: "I67.6",
        confidence: 40,
        reasoning:
          "Young woman on OCP with severe headache and risk factors for thrombosis. OCP use and smoking synergistically increase thrombosis risk. However, thunderclap onset is more classic for SAH.",
        keyFindings: [
          "OCP use",
          "Smoking history",
          "Severe headache",
          "Young female",
        ],
        redFlags: [
          "Can present with seizures or focal deficits",
          "CT venogram or MRV for diagnosis",
          "Anticoagulation is the treatment",
        ],
      },
      {
        name: "Bacterial Meningitis",
        icdCode: "G00.9",
        confidence: 25,
        reasoning:
          "Headache with neck stiffness, photophobia, nausea/vomiting, and low-grade fever. Classic triad of meningitis (headache, neck stiffness, fever) is partially present. However, thunderclap onset is atypical for meningitis.",
        keyFindings: [
          "Neck stiffness",
          "Photophobia",
          "Low-grade fever (99.8°F)",
          "Nausea/vomiting",
        ],
        redFlags: [
          "Can rapidly deteriorate",
          "Empiric antibiotics if suspected, don't delay for LP",
          "Check Kernig and Brudzinski signs",
        ],
      },
      {
        name: "Reversible Cerebral Vasoconstriction Syndrome (RCVS)",
        icdCode: "I67.841",
        confidence: 20,
        reasoning:
          "Recurrent thunderclap headaches in a young woman. Sumatriptan use is a known trigger for RCVS. Can present very similarly to SAH.",
        keyFindings: [
          "Thunderclap headache",
          "Young female",
          "Sumatriptan use (vasoconstrictor)",
          "Hypertension",
        ],
        redFlags: [
          "Risk of ischemic stroke or hemorrhagic conversion",
          "Avoid vasoconstrictors (sumatriptan contraindicated)",
          "CTA or MRA for diagnosis",
        ],
      },
    ],
    treatmentPlans: [
      {
        diagnosis: "Subarachnoid Hemorrhage",
        firstLine: [
          {
            name: "Nimodipine",
            dosage: "60mg PO/NG q4h",
            route: "Oral",
            duration: "21 days",
            evidenceLevel: "A",
          },
          {
            name: "Labetalol",
            dosage: "10-20mg IV PRN",
            route: "IV",
            duration: "Until BP controlled",
            evidenceLevel: "B",
          },
          {
            name: "Levetiracetam",
            dosage: "500-1000mg IV",
            route: "IV",
            duration: "Seizure prophylaxis (short-term)",
            evidenceLevel: "C",
          },
        ],
        alternatives: [
          {
            name: "Nicardipine drip",
            dosage: "5-15mg/hr IV",
            reason: "Alternative for blood pressure management",
          },
        ],
        nonPharmacological: [
          "Emergent non-contrast CT head",
          "If CT negative: Lumbar puncture (looking for xanthochromia)",
          "If positive: CTA to identify aneurysm location",
          "Neurosurgical consultation for coiling or clipping",
          "ICU admission with continuous monitoring",
          "Strict bed rest, quiet room, head of bed 30 degrees",
          "Stop oral contraceptives",
          "Smoking cessation",
        ],
        monitoring: [
          "Neurological checks q1h",
          "Continuous ICP monitoring if obtunded",
          "Daily TCDs for vasospasm screening (days 3-14)",
          "Daily serum sodium (risk of SIADH/cerebral salt wasting)",
          "Continuous cardiac monitoring (risk of neurogenic stunned myocardium)",
        ],
        followUp:
          "Neurosurgery follow-up in 2-4 weeks post-intervention. Repeat CTA/MRA at 6 months. Screen first-degree relatives for aneurysms. Lifelong smoking cessation. Alternative contraception (discontinue OCP).",
      },
      {
        diagnosis: "Cerebral Venous Sinus Thrombosis",
        firstLine: [
          {
            name: "Heparin",
            dosage: "80 units/kg bolus, then 18 units/kg/hr",
            route: "IV",
            duration: "Bridge to warfarin, INR 2-3",
            evidenceLevel: "B",
          },
          {
            name: "Warfarin",
            dosage: "Target INR 2.0-3.0",
            route: "Oral",
            duration: "6-12 months",
            evidenceLevel: "B",
          },
        ],
        alternatives: [
          {
            name: "Rivaroxaban",
            dosage: "20mg daily with food",
            reason: "DOAC alternative to warfarin for long-term anticoagulation",
          },
        ],
        nonPharmacological: [
          "CT venogram or MR venography for diagnosis",
          "Discontinue oral contraceptive pills",
          "Smoking cessation",
          "Thrombophilia workup",
        ],
        monitoring: [
          "INR monitoring (if warfarin)",
          "Repeat imaging at 3-6 months",
          "Neurological exams",
        ],
        followUp:
          "Neurology follow-up in 1-2 weeks. Hematology referral for thrombophilia evaluation. Duration of anticoagulation depends on provoked vs unprovoked.",
      },
      {
        diagnosis: "Bacterial Meningitis (if suspected)",
        firstLine: [
          {
            name: "Ceftriaxone",
            dosage: "2g IV q12h",
            route: "IV",
            duration: "10-14 days (organism dependent)",
            evidenceLevel: "A",
          },
          {
            name: "Vancomycin",
            dosage: "15-20mg/kg IV q8-12h",
            route: "IV",
            duration: "Until culture results",
            evidenceLevel: "A",
          },
          {
            name: "Dexamethasone",
            dosage: "0.15mg/kg IV q6h",
            route: "IV",
            duration: "4 days (give BEFORE or WITH first antibiotic dose)",
            evidenceLevel: "A",
          },
        ],
        alternatives: [
          {
            name: "Meropenem",
            dosage: "2g IV q8h",
            reason: "Alternative if cephalosporin allergy",
          },
        ],
        nonPharmacological: [
          "Lumbar puncture (if no contraindication)",
          "Blood cultures before antibiotics",
          "Contact isolation",
          "Close contact prophylaxis if N. meningitidis",
        ],
        monitoring: [
          "Clinical response within 24-48h",
          "Repeat LP if no improvement at 48h",
          "Renal function (vancomycin dosing)",
        ],
        followUp:
          "Infectious disease follow-up. Audiometry post-treatment. Cognitive assessment.",
      },
    ],
    drugInteractions: [
      {
        drug1: "Sumatriptan",
        drug2: "Nimodipine",
        severity: "severe",
        mechanism:
          "Sumatriptan causes vasoconstriction while nimodipine prevents vasospasm. Sumatriptan contraindicated in SAH due to vasoconstrictive properties.",
        clinicalEffect:
          "Sumatriptan could worsen cerebral vasospasm and cause ischemic stroke in the setting of SAH",
        recommendation:
          "DISCONTINUE sumatriptan immediately. Absolutely contraindicated if SAH is confirmed or suspected.",
      },
      {
        drug1: "Oral Contraceptive Pills",
        drug2: "Heparin/Warfarin",
        severity: "moderate",
        mechanism:
          "OCPs are prothrombotic while anticoagulants are antithrombotic — opposing mechanisms",
        clinicalEffect:
          "OCP use may reduce anticoagulant efficacy and contributed to the thrombotic event",
        recommendation:
          "Discontinue OCP. Switch to non-estrogen contraception method. OCP is a modifiable risk factor.",
      },
    ],
    references: [
      {
        title: "Guidelines for the Management of Aneurysmal Subarachnoid Hemorrhage: A Guideline for Healthcare Professionals From the AHA/ASA",
        authors: "Connolly ES, Rabinstein AA, Carhuapoma JR, et al.",
        journal: "Stroke",
        year: 2012,
        relevance: "Primary guideline for SAH management",
        keyFinding: "Early aneurysm treatment (within 24h) reduces rebleeding. Nimodipine is the only calcium channel blocker shown to improve outcomes in SAH.",
        evidenceLevel: "Clinical Practice Guideline",
      },
      {
        title: "Diagnosis of Subarachnoid Hemorrhage: Ottawa SAH Rule",
        authors: "Perry JJ, Stiell IG, Sivilotti MLA, et al.",
        journal: "JAMA",
        year: 2013,
        relevance: "Validated clinical decision rule for SAH",
        keyFinding: "Ottawa SAH Rule has 100% sensitivity for SAH. Rule includes: age >40, neck pain/stiffness, witnessed LOC, onset during exertion, thunderclap headache, limited neck flexion.",
        evidenceLevel: "Prospective Validation Study",
      },
      {
        title: "Cerebral venous thrombosis: an update",
        authors: "Ferro JM, Canhão P, Stam J, et al.",
        journal: "Lancet Neurology",
        year: 2017,
        relevance: "Comprehensive review of CVST — important differential diagnosis",
        keyFinding: "OCP use is the most common risk factor for CVST in young women. Anticoagulation is safe and effective even in the presence of hemorrhagic infarction.",
        evidenceLevel: "Systematic Review",
      },
      {
        title: "Thunderclap Headache: Diagnostic Approach",
        authors: "Ducros A, Bousser MG",
        journal: "Current Pain and Headache Reports",
        year: 2013,
        relevance: "Systematic approach to thunderclap headache differential",
        keyFinding: "SAH must be excluded first. If CT and LP negative, consider RCVS, CVST, and other secondary causes. Recurrent thunderclaps suggest RCVS.",
        evidenceLevel: "Expert Review",
      },
    ],
    criticalAlerts: [
      "EMERGENT: Thunderclap headache — rule out Subarachnoid Hemorrhage IMMEDIATELY",
      "SEVERE: Obtain non-contrast CT head STAT — if negative, lumbar puncture required",
      "CONTRAINDICATED: STOP sumatriptan — vasoconstrictors contraindicated if SAH suspected",
      "RED FLAG: Discontinue oral contraceptives — thrombotic risk factor",
      "RED FLAG: Smoking + OCP = synergistic stroke risk. Counsel on cessation.",
    ],
    summary: "32yo Female presenting with sudden onset worst headache of life. Most likely diagnosis: Subarachnoid Hemorrhage (85% confidence). 5 critical alert(s) require attention. Emergent CT head and possible LP required.",
  },
  "pediatric-fever": {
    parsedCase: {
      chiefComplaint: "High fever for 5 consecutive days with rash and mucocutaneous findings",
      symptoms: [
        "High fever (up to 104°F) for 5 days",
        "Bilateral conjunctival injection",
        "Cracked red lips",
        "Strawberry tongue",
        "Diffuse erythematous rash",
        "Swelling of hands and feet",
        "Extreme irritability",
      ],
      duration: "5 days",
      medicalHistory: [],
      medications: [],
      allergies: ["Amoxicillin (rash)"],
      age: 4,
      sex: "Male",
      vitalSigns: {
        bloodPressure: "85/55",
        heartRate: 140,
        temperature: 103.8,
        respiratoryRate: 28,
        oxygenSaturation: 98,
      },
      additionalNotes: "Labs: ESR 65, CRP 8.2, WBC 15,000, Platelets 450,000 (thrombocytosis). Meets clinical criteria for Kawasaki disease.",
    },
    differentialDiagnoses: [
      {
        name: "Kawasaki Disease",
        icdCode: "M30.3",
        confidence: 95,
        reasoning: "Classic presentation meeting 5 of 5 principal clinical features: (1) Fever ≥5 days, (2) bilateral conjunctival injection, (3) oral mucosal changes (cracked lips, strawberry tongue), (4) rash, (5) extremity changes (swelling). Elevated inflammatory markers (ESR, CRP) and thrombocytosis strongly support diagnosis. Age 4 is within typical range (6 months to 5 years).",
        keyFindings: [
          "Fever ≥5 days (5 consecutive days of 104°F)",
          "5/5 principal clinical criteria met",
          "Elevated ESR (65) and CRP (8.2)",
          "Thrombocytosis (450,000)",
          "Leukocytosis (WBC 15,000)",
          "Age 4 — classic age range",
        ],
        redFlags: [
          "Coronary artery aneurysm risk — highest if treatment delayed beyond day 10",
          "Echocardiogram needed URGENTLY",
          "IVIG must be started as soon as diagnosis is made",
          "Risk of macrophage activation syndrome",
          "Giant coronary aneurysms (>8mm) carry lifelong risk",
        ],
      },
      {
        name: "Scarlet Fever",
        icdCode: "A38",
        confidence: 25,
        reasoning: "Group A Streptococcal infection can cause fever, rash, and strawberry tongue. However, the full constellation of conjunctivitis, extremity changes, and 5-day fever duration is more consistent with Kawasaki disease.",
        keyFindings: [
          "Strawberry tongue",
          "Diffuse erythematous rash",
          "Fever",
          "Age-appropriate",
        ],
        redFlags: [
          "Obtain rapid strep test and throat culture",
          "Can occur concurrently with Kawasaki disease",
        ],
      },
      {
        name: "Juvenile Idiopathic Arthritis (Systemic)",
        icdCode: "M08.20",
        confidence: 15,
        reasoning: "Systemic JIA can present with quotidian fevers, rash, and elevated inflammatory markers. However, the specific mucocutaneous findings (conjunctivitis, strawberry tongue, hand/foot swelling) are more characteristic of Kawasaki disease.",
        keyFindings: [
          "High spiking fever",
          "Rash",
          "Elevated inflammatory markers",
          "Irritability",
        ],
        redFlags: [
          "Consider if fever persists beyond typical Kawasaki time course",
          "Risk of macrophage activation syndrome",
        ],
      },
      {
        name: "Toxic Shock Syndrome",
        icdCode: "A48.3",
        confidence: 10,
        reasoning: "Can present with fever, rash, and multi-organ involvement. However, the absence of hypotension (BP 85/55 is normal for age 4) and the specific mucocutaneous findings favor Kawasaki disease.",
        keyFindings: [
          "Fever",
          "Diffuse rash",
          "Mucosal involvement",
        ],
        redFlags: [
          "Monitor for hemodynamic instability",
          "Blood cultures to rule out bacterial etiology",
        ],
      },
    ],
    treatmentPlans: [
      {
        diagnosis: "Kawasaki Disease",
        firstLine: [
          {
            name: "IVIG (Intravenous Immunoglobulin)",
            dosage: "2 g/kg as a single infusion over 10-12 hours",
            route: "IV",
            duration: "Single dose",
            evidenceLevel: "A",
          },
          {
            name: "Aspirin (High-dose)",
            dosage: "80-100 mg/kg/day divided q6h",
            route: "Oral",
            duration: "Until afebrile for 48-72 hours",
            evidenceLevel: "A",
          },
          {
            name: "Aspirin (Low-dose, maintenance)",
            dosage: "3-5 mg/kg/day",
            route: "Oral",
            duration: "6-8 weeks minimum (longer if coronary abnormalities)",
            evidenceLevel: "A",
          },
        ],
        alternatives: [
          {
            name: "Infliximab",
            dosage: "5 mg/kg IV single dose",
            reason: "For IVIG-resistant Kawasaki disease (fever persists >36 hours post-IVIG)",
          },
          {
            name: "Methylprednisolone",
            dosage: "30 mg/kg IV pulse, then oral taper",
            reason: "For IVIG-resistant cases or high-risk patients (Kobayashi score)",
          },
        ],
        nonPharmacological: [
          "Echocardiogram at diagnosis (baseline coronary assessment)",
          "Hospital admission for monitoring",
          "Cardiology consultation",
          "IV fluids for hydration",
          "Monitor for IVIG reaction (slow infusion, premedicate with acetaminophen/diphenhydramine)",
          "Avoid live vaccines for 11 months after IVIG",
        ],
        monitoring: [
          "Temperature monitoring q4h — fever should resolve within 36h of IVIG",
          "Repeat echocardiogram at 2 weeks",
          "Repeat echocardiogram at 6-8 weeks",
          "If coronary abnormalities: more frequent echo + cardiology follow-up",
          "CBC with platelets weekly (peak thrombocytosis at week 2-3)",
          "ESR and CRP trending",
          "Liver function tests",
          "Monitor for IVIG infusion reactions",
        ],
        followUp: "Pediatric cardiology follow-up at 2 weeks and 6-8 weeks with echocardiogram. If coronary abnormalities detected: long-term cardiology follow-up with serial imaging. Low-dose aspirin for 6-8 weeks if no coronary involvement. If coronary aneurysms: long-term antiplatelet/anticoagulation per cardiology. Avoid live vaccines for 11 months post-IVIG.",
      },
    ],
    drugInteractions: [
      {
        drug1: "IVIG",
        drug2: "Live Vaccines (MMR, Varicella)",
        severity: "moderate",
        mechanism: "IVIG contains antibodies that can neutralize live vaccine viruses, reducing vaccine efficacy",
        clinicalEffect: "Live vaccines given within 11 months of IVIG may not produce adequate immune response",
        recommendation: "Delay all live vaccines for 11 months after IVIG administration. Inactivated vaccines can be given on schedule.",
      },
      {
        drug1: "Aspirin",
        drug2: "Amoxicillin (ALLERGIC)",
        severity: "mild",
        mechanism: "Not a drug interaction — noting patient's amoxicillin allergy for reference",
        clinicalEffect: "Patient has documented amoxicillin rash allergy. Avoid penicillin-class antibiotics if needed.",
        recommendation: "Document allergy prominently. If antibiotics needed, use non-penicillin alternatives.",
      },
      {
        drug1: "Aspirin (High-dose)",
        drug2: "Ibuprofen",
        severity: "severe",
        mechanism: "Ibuprofen competitively inhibits the irreversible antiplatelet effect of aspirin on COX-1",
        clinicalEffect: "Ibuprofen can block aspirin's antiplatelet benefit, potentially increasing coronary thrombosis risk",
        recommendation: "AVOID ibuprofen in Kawasaki disease patients on aspirin. Use acetaminophen for fever/pain as needed.",
      },
    ],
    references: [
      {
        title: "Diagnosis, Treatment, and Long-Term Management of Kawasaki Disease: AHA Scientific Statement",
        authors: "McCrindle BW, Rowley AH, Newburger JW, et al.",
        journal: "Circulation",
        year: 2017,
        relevance: "Primary guideline for Kawasaki disease diagnosis and management",
        keyFinding: "IVIG (2g/kg single dose) within 10 days of fever onset reduces coronary artery aneurysm incidence from 25% to <5%. High-dose aspirin followed by low-dose aspirin is standard adjunctive therapy.",
        evidenceLevel: "Clinical Practice Guideline (AHA)",
      },
      {
        title: "Randomized trial of IVIG versus IVIG plus infliximab for IVIG-resistant Kawasaki disease",
        authors: "Burns JC, Roberts SC, Tremoulet AH, et al.",
        journal: "Journal of Pediatrics",
        year: 2018,
        relevance: "Evidence for managing IVIG-resistant cases",
        keyFinding: "Infliximab (5 mg/kg) is effective as rescue therapy for IVIG-resistant Kawasaki disease, with faster fever resolution than second IVIG dose.",
        evidenceLevel: "Randomized Controlled Trial",
      },
      {
        title: "Kawasaki Disease: A Brief History",
        authors: "Burns JC, Glodé MP",
        journal: "Pediatrics",
        year: 2004,
        relevance: "Foundational overview of disease discovery and evolution of treatment",
        keyFinding: "Kawasaki disease is the leading cause of acquired heart disease in children in developed countries. Early recognition and treatment is critical to prevent coronary complications.",
        evidenceLevel: "Review Article",
      },
      {
        title: "Prediction of IVIG Resistance in Kawasaki Disease: Kobayashi Score",
        authors: "Kobayashi T, Inoue Y, Takeuchi K, et al.",
        journal: "Journal of Pediatrics",
        year: 2006,
        relevance: "Risk stratification for IVIG resistance",
        keyFinding: "Kobayashi score (based on sodium, AST, CRP, %neutrophils, platelet count, days of illness, age) predicts IVIG resistance. Score ≥5 indicates high risk, may benefit from upfront adjunctive steroids.",
        evidenceLevel: "Prospective Cohort Study",
      },
    ],
    criticalAlerts: [
      "URGENT: Start IVIG immediately — treatment within 10 days of fever onset reduces coronary aneurysm risk from 25% to <5%",
      "CRITICAL: Echocardiogram needed NOW — assess coronary arteries at baseline",
      "RED FLAG: Day 5 of fever — approaching optimal treatment window. Do not delay.",
      "SEVERE: Avoid ibuprofen — blocks aspirin's antiplatelet effect in Kawasaki disease",
      "IMPORTANT: Delay live vaccines (MMR, Varicella) for 11 months post-IVIG",
    ],
    summary: "4yo Male presenting with high fever for 5 days with mucocutaneous findings. Most likely diagnosis: Kawasaki Disease (95% confidence). 5 critical alert(s) require attention. IVIG treatment must begin immediately to prevent coronary artery aneurysms.",
  },
};
