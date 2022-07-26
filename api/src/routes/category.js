import {prisma} from '../lib/db.js';
import { z } from 'zod';

async function queryCategory(params){
  const lookupID = parseInt(params.userID)
  return await prisma.category.findMany({
    where: {
      userID: lookupID
    }
  })
}

export async function getCategories(req, res){
  const categories = await queryCategory(req.params)
    .then((response) => response)
    .catch((e) => {
      throw e
    })
    .finally( async () => {
      await prisma.$disconnect()
    })
  console.log(categories)

  res.send({ categories: categories })
}