import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: 'secret_cDlm4Nqjia2yJtIu2FYgEP1X6gp7rU3ZOAC3x6CwPiz',
})

const databaseId = '8b76449043244333824320146550ccf6'

async function getDetail(pageId: string, propertyId: string) {
  try {
    const response = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    })

    console.log(response)
    return response
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}

type Data = {
  detail?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { pageId, propertyId } = req.query
  try {
    const response = await getDetail(String(pageId), String(propertyId))
    res.status(200).json({ detail: response, message: `Success` })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
