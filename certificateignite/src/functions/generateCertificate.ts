import { APIGatewayProxyHandler } from "aws-lambda"
import * as dayjs from "dayjs"
import { readFileSync } from "fs"
import { compile } from 'handlebars'
import { join } from 'path'

import { document } from '../utils/dynamoDBClient'

interface ICreateCertificate {
  id: string
  name: string
  grade: string
}

interface ITemplate {
  id: string;
  name: string;
  grade: string;
  medal: string;
  date: string;
  medal: string;
}

function compileTemplate(data: ITemplate) {
  const filePath = join(process.cwd(), "src", "templates", "certificate.hbs")
  const html = readFileSync(filePath, "utf-8")

  return compile(html)(data)
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate

  await document.put({ 
    TableName: "users_certificate", 
    Item: { id, name, grade, createdAt: new Date().getTime() } 
  }).promise()

  const response = await document.query({
    TableName: "users_certificate",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: { ":id": id }
  }).promise()

  const medalPath = join(process.cwd(), "src", "templates", "selo.png")
  const medal = readFileSync(medalPath, "base64")

  const data: ITemplate = {
    name,
    id,
    grade,
    date: dayjs().format('DD/MM/YYYY'),
    medal
  }

  const content = await compileTemplate(data)

  return {
    statusCode: 201,
    body: JSON.stringify(response.Items[0])
  }
}