
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const connectionString = process.env.DATABASE_URL;
  console.log('Testing connection string:', connectionString?.replace(/:[^:@]+@/, ':****@'));

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    console.log('Attempting to connect...');
    await prisma.$connect();
    console.log('✅ Connected!');
    const count = await prisma.product.count();
    console.log('✅ Count:', count);
  } catch (err: any) {
    console.error('❌ Error caught:');
    console.error('Message:', err.message);
    console.error('Code:', err.code);
    console.error('Stack:', err.stack);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
