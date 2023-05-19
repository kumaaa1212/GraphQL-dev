const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: 'Fullstack tutorial for GraphQL',
      url: 'www.howtographql.com',
    },
  })
  const allLinks = await prisma.link.findMany();
  // 全てを取得する
}
main().catch((e) => {
  throw e
})
.finally(async () => {
  prisma.$disconnect()
})
// スキーマーを小文字で記入する