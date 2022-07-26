import {prisma} from '../lib/db.js';
import { z } from 'zod';

//get categories based on user ID
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

// make a new category
export async function newCategory(req, res){
  const catSchema = z.object({
    name: z.string(),
    userID: z.number()
  })
  if(!req.body || !catSchema.parse(req.body)){
    req.status(400).send('Invalid request format')
    return
  }
  const category = await prisma.category.create({
    data:{
      name: req.body.name,
      userID: req.body.userID
    }
  })
  console.log(category)

  res.json({ category: category})
}

// update a category
export async function updateCategory(req, res){
  const catSchema = z.object({
    name: z.string(),
    userID: z.number(),
  });
  if (!req.body || !catSchema.parse(req.body)) {
    req.status(400).send('Invalid request format');
    return;
  }
  const catID = parseInt(req.params.id)
  const category = await prisma.category.update({
    where:{
      id: catID
    },
    data: {
      name: req.body.name,
      userID: req.body.userID
    }
  })
  console.log(category)
  res.json({ category: category })
}

// delete a category
export async function deleteCategory(req, res){
  const catID = parseInt(req.params.id)
  const category = await prisma.category.delete({
    where:{
      id: catID
    }
  })
  
  res.send('Category deleted')
}