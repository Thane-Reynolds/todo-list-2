import {prisma} from '../lib/db.js'
import { z } from 'zod';

// get all users
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

// get specific user and all todos
async function queryUser(params){
  const userId = parseInt(params.id)
  return await prisma.user.findUnique({
    where:{
      id: userId
    },
    include: {
      todo: {
        include: {
          category: {
            select: {
              name: true
            }
        },
          location: {
            select:{
              name: true,
              streetadd: true,
              city: true,
              state: true,
              country: true,
              postal: true
            }
          }
        }
      }
    }
  })
}

export async function getUser(req, res){
  const user = await queryUser(req.params)
    .then((response) => response)
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

    console.log(user);

    res.json({ user: user })
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