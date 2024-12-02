// TODO: fix restrict-template-expressions
/* eslint-disable @typescript-eslint/restrict-template-expressions */
// TODO: fix no unsafe assignment
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 },
      );
    }

    const response = await fetch(url);
    const text = await response.text();

    return NextResponse.json({ data: text }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch pokepaste ${error}` },
      { status: 500 },
    );
  }
}
