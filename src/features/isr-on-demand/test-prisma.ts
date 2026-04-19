import prisma from '../../lib/prisma'

async function main() {
  try {
    await prisma.$connect()
    console.log('✅ Prisma connected successfully!')
    const products = await prisma.product.findMany({ take: 1 })
    console.log('✅ Query successful. Products found:', products.length)
  } catch (e) {
    console.error('❌ Prisma connection failed:', e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
