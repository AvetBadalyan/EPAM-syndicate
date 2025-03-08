const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const AUDIT_TABLE_NAME = process.env.target_table;

  console.log('event.Records: ', event.Records);
  for (const item of event.Records) {
    const eventName = item.eventName;
    const newImage = AWS.DynamoDB.Converter.unmarshall(item.dynamodb.NewImage);
    const oldImage = item.dynamodb.OldImage
      ? AWS.DynamoDB.Converter.unmarshall(item.dynamodb.OldImage)
      : null;

    if (eventName === 'INSERT') {
      console.log('INSERT-INSERT');

      const item = {
        id: uuid.v4(),
        itemKey: newImage.key,
        modificationTime: new Date().toISOString(),
        newValue: {
          key: newImage.key,
          value: newImage.value,
        },
      };

      await dynamoDb
        .put({
          TableName: AUDIT_TABLE_NAME,
          Item: item,
        })
        .promise();
    } else if (eventName === 'MODIFY') {
      console.log('MODIFY-MODIFY');

      const item = {
        id: uuid.v4(),
        itemKey: newImage.key,
        modificationTime: new Date().toISOString(),
        updatedAttribute: 'value',
        oldValue: oldImage.value,
        newValue: newImage.value,
      };

      await dynamoDb
        .put({
          TableName: AUDIT_TABLE_NAME,
          Item: item,
        })
        .promise();
    }
  }

  return null;
};
