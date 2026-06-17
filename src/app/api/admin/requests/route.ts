import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const requests = await prisma.serviceRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
