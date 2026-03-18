import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ajusta la ruta a tu cliente de Prisma

export async function GET() {
  try {
    // Consultamos los servicios incluyendo su categoría para obtener el nombre
    const dbServices = await prisma.service.findMany({
      include: {
        category: true,
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Mapeamos los datos al formato que espera tu Store de Zustand
    const services = dbServices.map(service => ({
      id: service.id,
      name: service.name,
      website: service.website || "",
      categoryName: service.category.name // Usamos el nombre de la relación
    }));

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Error al cargar servicios" }, { status: 500 });
  }
}