import { v5 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createUser(event, context) {
    const { username, email, password} = JSON.parse(event.body);
    const now = new Date();

    const user = {
        id: uuid(),
        username,
        email,
        password,
        userCreatedAt: now.toISOString(),
    };

    try {
        await dynamodb.put({
            TableName: process.env.USERS_TABLE_NAME,
            Item: user,
        }).promise();
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 201,
        body: JSON.stringify(user),
    };
}

export const handler = createUser;