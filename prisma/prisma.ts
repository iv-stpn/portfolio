import { PrismaClient } from "@prisma/client";
import { isProduction } from "app/utils/constants";

declare global {
    var prismaClient: PrismaClient | undefined;
}

const prisma = global.prismaClient || new PrismaClient();

if (!isProduction) global.prismaClient = prisma;

export default prisma;
