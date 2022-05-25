import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from "../utils/dynamoDBClient";

interface IUserCertificate {
  id: string
  name: string
  createdAt: string;
  grade: string
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters

  const response = await document.query({
    TableName: "users_certificate",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: { ":id": id }
  }).promise()

  const userCertificate = response.Items[0] as IUserCertificate

  if (userCertificate) {
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "valid certificate!",
        name: userCertificate.name,
        url: `https://certificateignitelccoronel.s3.amazonaws.com/${id}.pdf`
      })
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: "invalid certificate!" })
  }
}