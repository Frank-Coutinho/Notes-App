import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {

  const allUsers = await prisma.user.findFirst();
  const notes = await prisma.notes.findMany();

  console.log(allUsers, { depth: null });
  console.log(notes);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err.message);
    await prisma.$disconnect();
    process.exit(1);
  });
