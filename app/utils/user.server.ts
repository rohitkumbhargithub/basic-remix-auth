// user.server.ts
import bcrypt from 'bcryptjs';
import { prisma } from './db.server'; // Assuming you're using Prisma for the database

// Register user
export async function registerUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return user;
}

// Verify user login
export async function verifyUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}
