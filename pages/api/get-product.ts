import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getProduct(id: number) {
  try {
    const response = await prisma.products.findUnique({
      where: {
        id,
      },
    })

    return response
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  item?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query

  if (id === null) {
    res.status(400).json({ message: `no product id` })
    return
  }
  try {
    const product = await getProduct(Number(id))
    res.status(200).json({ item: product, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
