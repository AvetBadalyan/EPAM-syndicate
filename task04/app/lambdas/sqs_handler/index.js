exports.handler = async event => {
  try {
    // Iterate through each SQS message in the event
    for (const record of event.Records) {
      // Log the message body to CloudWatch Logs
      console.log(`Message Body: ${record.body}`);
    }

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify('Messages processed successfully!'),
    };
  } catch (error) {
    console.error('Error processing SQS messages:', error);

    // Return an error response
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to process messages'),
    };
  }
};
