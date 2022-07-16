import {prisma} from '../lib/db.js'

async function queryUsers() {
  return await prisma.user.findMany();
}

export async function getUsers(req, res) {
  const users = await queryUsers()
    .then((response) => response)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  console.log(users);

  res.json({ users: users });
}
