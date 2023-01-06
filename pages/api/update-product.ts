import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateProduct(id: number, contents: string) {
  try {
    const response = await prisma.products.update({
      where: {
        id,
      },
      data: {
        contents,
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
  const { id, contents } = JSON.parse(req.body)

  if (id === null || contents === null) {
    res.status(400).json({ message: `no product id or contents` })
    return
  }
  try {
    const product = await updateProduct(Number(id), contents)
    res.status(200).json({ item: product, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
