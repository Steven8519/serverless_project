import AWS from 'aws-sdk';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getUsers(event, context) {
    let users;

    try {
        const result = await dynamodb.scan({
            TableName: process.env.USERS_TABLE_NAME
        }).promise();

        users = result.Items;
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(users),
    };
}

export const handler = getUsers;