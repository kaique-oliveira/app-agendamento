import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.dayWeek.createMany({
    data: [
      { day: 'Segunda-Feira', index: 2 },
      { day: 'Terça-Feira', index: 3 },
      { day: 'Quarta-Feira', index: 4 },
      { day: 'Quinta-Feira', index: 5 },
      { day: 'Sexta-Feira', index: 6 },
      { day: 'Sábado', index: 7 },
      { day: 'Domingo', index: 1 },
    ],
  });

  await prisma.client.create({
    data: {
      name: 'João Paulo',
      phone: '14992878766',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
