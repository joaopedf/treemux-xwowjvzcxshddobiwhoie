import { NextRequest, NextResponse } from "next/server";
import { runClinicalAnalysis } from "@/lib/agents";
import { DEMO_RESULTS, DEMO_CASES } from "@/lib/demo-data";

export async function POST(request: NextRequest) {
  try {
    const { input, demoId } = await request.json();

    // If a demo case ID is provided and we have demo results, use them
    if (demoId && DEMO_RESULTS[demoId]) {
      // Simulate agent processing with staged delays
      return NextResponse.json({
        success: true,
        data: DEMO_RESULTS[demoId],
        isDemo: true,
      });
    }

    // Check if API key is available for live analysis
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Find closest demo case or return first one
      const demoCase = DEMO_CASES[0];
      const demoResult = DEMO_RESULTS[demoCase.id];

      return NextResponse.json({
        success: true,
        data: demoResult,
        isDemo: true,
        message:
          "Running in demo mode — API keys not configured. Showing pre-computed clinical analysis.",
      });
    }

    // Live analysis with AI agents
    const result = await runClinicalAnalysis(input);

    return NextResponse.json({
      success: true,
      data: result,
      isDemo: false,
    });
  } catch (error) {
    console.error("Analysis error:", error);

    // Fallback to demo data on error
    const demoResult = DEMO_RESULTS["chest-pain"];
    return NextResponse.json({
      success: true,
      data: demoResult,
      isDemo: true,
      message: "Falling back to demo mode due to an error.",
    });
  }
}
