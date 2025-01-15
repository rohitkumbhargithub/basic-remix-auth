// src/db.server.js
import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient();

export { prisma };
