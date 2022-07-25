import {prisma} from '../lib/db.js'
import { z } from 'zod';

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

// function for posting a new user, should have just a field for username
export async function createUser(req, res) {
  const userSchema = z.string();
  console.log(req.body)
  if(!req.body || !req.body.username || !userSchema.parse(req.body.username)){
    res.status(400).send('Username is required')
    return
  } 
  const user = await prisma.user.create({
    data: {
      username: req.body.username
    }
  })
  res.json({ user: user });
}

// function for deleting a user, delete both id and username