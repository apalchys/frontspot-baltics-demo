import * as AWS from "aws-sdk";
import { APIGatewayProxyEventV2 } from "aws-lambda";

type RequestBody = {
  username?: string;
  data?: object;
};

const s3 = new AWS.S3();

export async function handler(request: APIGatewayProxyEventV2) {
  const body: RequestBody = request.body ? JSON.parse(request.body) : {};

  // Check server configuration
  if (!process.env.BUCKET_NAME) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Bucket name is not defined" }),
    };
  }

  // Validate request body
  if (!body.data || !body.username) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Bad request" }),
    };
  }

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${body.username}.json`,
    Body: JSON.stringify(body.data),
  };

  // upload content
  await s3.putObject(params).promise();

  // success response
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Content uploaded" }),
  };
}
