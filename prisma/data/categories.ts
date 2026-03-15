import { Prisma } from "@/app/generated/prisma/client";

export const categories: Prisma.CategoryCreateManyInput[] = [
  { name: 'Streaming', description: 'Plataformas de video, música y entretenimiento' },
  { name: 'Software', description: 'Herramientas de productividad, SaaS y desarrollo' },
  { name: 'Servicios', description: 'Servicios básicos, internet o telefonía' },
  { name: 'Gaming', description: 'Suscripciones de consolas y catálogos de juegos' },
  { name: 'Educación', description: 'Plataformas de aprendizaje y cursos' },
  { name: 'Finanzas', description: 'Servicios bancarios, seguros y contabilidad' }
];