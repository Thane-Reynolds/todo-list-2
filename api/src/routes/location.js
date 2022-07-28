import { prisma } from "../lib/db.js";
import { z } from 'zod';

// get locations based on user id
async function queryLocation(params){
  const lookupID = parseInt(params.userID)
  return await prisma.location.findMany({
    where:{
      userID: lookupID
    }
  })
}

export async function getLocations(req, res){
  const locations = await queryLocation(req.params)
    .then((response) => response)
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
  console.log(locations)

  res.send({ locations: locations })
}

// make a new location
export async function createLocation(req, res){
  const locSchema = z.object({
    name: z.string(),
    userID: z.number(),
    streetadd: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postal: z.string().optional()
  });
  if(!req.body || !locSchema.parse(req.body)){
    res.status(400).send('Invalid request format')
    return
  }
  const location = await prisma.location.create({
    data: {
      name: req.body.name,
      userID: req.body.userID,
      streetadd: req.body.streetadd,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      postal: req.body.postal
    }
  });
  console.log(location);

  res.send({ location: location })
}

// update a location
export async function updateLocation(req, res){
  const locSchema = z.object({
    name: z.string(),
    userID: z.number(),
    streetadd: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postal: z.string().optional(),
  });
  if (!req.body || !locSchema.parse(req.body)) {
    res.status(400).send('Invalid request format');
    return;
  }
  const locID = parseInt(req.params.id);
  const location = await prisma.location.update({
    where: {
      id: locID,
    },
    data: {
      name: req.body.name,
      userID: req.body.userID,
      streetadd: req.body.streetadd,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      postal: req.body.postal,
    },
  });
  console.log(location);

  res.send({ location: location })
}

// delete a location
export async function deleteLocation(req,res){
  const locID = parseInt(req.params.id);
  const location = await prisma.location.delete({
    where:{
      id: locID
    }
  })

  res.send('Location entry deleted')
}