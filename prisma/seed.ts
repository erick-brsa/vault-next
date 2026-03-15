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
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });