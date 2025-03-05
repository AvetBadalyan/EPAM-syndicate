exports.handler = async (event) => {
  console.log("Received SNS event:", JSON.stringify(event, null, 2));

  // Extract messages from SNS
  event.Records.forEach((record) => {
    const snsMessage = record.Sns;
    console.log("SNS Message ID:", snsMessage.MessageId);
    console.log("SNS Subject:", snsMessage.Subject || "No Subject");
    console.log("SNS Message:", snsMessage.Message);
  });

  return { statusCode: 200, body: "Message processed." };
};
