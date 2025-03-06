const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.target_table;

exports.handler = async event => {
  const params = {
    TableName: tableName,
    Item: {
      id: uuid.v4(),
      principalId: event.principalId,
      createdAt: new Date().toISOString(),
      body: event.content,
    },
  };
  try {
    await dynamoDb.put(params).promise();
    return { statusCode: 201, event: params.Item };
  } catch (err) {
    return JSON.stringify(err, null, 2);
  }
};
