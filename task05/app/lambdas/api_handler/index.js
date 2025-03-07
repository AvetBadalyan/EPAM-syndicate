const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const DB_Table = process.env.target_table;

exports.handler = async event => {
  try {
    const { principalId, content } = event;
    const freshID = uuid.v4();
    const freshTime = new Date().toISOString();

    const item = {
      TableName: DB_Table,
      Item: {
        id: freshID,
        principalId: principalId,
        createdAt: freshTime,
        body: content,
      },
    };

    await dynamoDb.put(item).promise();

    const resultObj = {
      id: freshID,
      principalId: principalId,
      createdAt: freshTime,
      body: content,
    };

    return {
      statusCode: 201,
      body: JSON.stringify({ event: resultObj }),
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
