import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.catalogue.createMany({
    data: [
      { name: '🧥 Верхняя одежда', url: 'luckybuyer888_kurtki' },
      { name: '👞 Обувь', url: 'luckybuyer888_shoes' },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
