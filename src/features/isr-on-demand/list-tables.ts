import prisma from '../../lib/prisma'

async function main() {
  try {
    const tables: any[] = await (prisma as any).$queryRaw`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';`
    console.log('Tables in public schema:', tables.map(t => t.tablename))
  } catch (e) {
    console.error('Failed to list tables:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
