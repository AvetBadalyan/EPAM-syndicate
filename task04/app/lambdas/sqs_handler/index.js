exports.handler = async (event) => {
  try {
    console.log("Received SQS event:", JSON.stringify(event, null, 2));

    for (const record of event.Records) {
      console.log(`Message ID: ${record.messageId}`);
      console.log(`Message Body: ${record.body}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Successfully processed SQS messages." }),
    };
  } catch (error) {
    console.error("Error processing SQS messages:", error);
    throw error;
  }
};
