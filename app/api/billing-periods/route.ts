import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

export async function GET() {
  try {
    const periods = await prisma.billingPeriod.findMany({
      orderBy: {
        durationDays: 'asc' 
      }
    });
    return NextResponse.json(periods);
  } catch (error) {
    return NextResponse.json({ error: "Error al cargar periodos" }, { status: 500 });
  }
}