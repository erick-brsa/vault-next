import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

import { billingPeriods } from './data/billing-periods';
import { categories } from './data/categories';
import { services } from './data/services';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

export async function main() {
    await prisma.subscription.deleteMany();
    await prisma.service.deleteMany();
    await prisma.user.deleteMany();
    await prisma.category.deleteMany();
    await prisma.billingPeriod.deleteMany();

    await prisma.billingPeriod.createMany({ data: billingPeriods, skipDuplicates: true });
    await prisma.category.createMany({ data: categories, skipDuplicates: true });

    const dbCategories = await prisma.category.findMany();
    const catMap = Object.fromEntries(dbCategories.map(c => [c.name, c.id]));

    const servicesData = services.map(s => ({
        name: s.name,
        website: s.website,
        categoryId: catMap[s.categoryName]
    }));

    await prisma.service.createMany({ data: servicesData, skipDuplicates: true });

    const counts = [
        { label: "Categorias", value: await prisma.category.count() },
        { label: "Servicios", value: await prisma.service.count() },
        { label: "Periodos", value: await prisma.billingPeriod.count() },
    ];

    const cyan = "\x1b[36m";
    const white = "\x1b[37m";
    const bold = "\x1b[1m";
    const reset = "\x1b[0m";

    const width = 40; // Ancho total fijo
    const line = "─".repeat(width);
    const title = "RESUMEN DE BASE DE DATOS (VAULT)";

    // Cálculo de centrado para el título
    const paddingTotal = width - title.length;
    const padLeft = " ".repeat(Math.floor(paddingTotal / 2));
    const padRight = " ".repeat(Math.ceil(paddingTotal / 2));

    console.log(`\n${cyan}${bold}┌${line}┐${reset}`);
    console.log(`${cyan}${bold}│${white}${padLeft}${title}${padRight}${cyan}${bold}│${reset}`);
    console.log(`${cyan}${bold}├${line}┤${reset}`);

    counts.forEach(({ label, value }) => {
        // 2 espacios de margen + label + espacios intermedios + value + 2 espacios de margen
        const rowLabel = `  ${label}:`;
        const rowValue = `${value}  `;
        const middleSpaces = " ".repeat(width - rowLabel.length - rowValue.length);

        console.log(`${cyan}${bold}│${reset}${white}${rowLabel}${middleSpaces}${bold}${rowValue}${cyan}${bold}│${reset}`);
    });

    console.log(`${cyan}${bold}└${line}┘${reset}\n`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });