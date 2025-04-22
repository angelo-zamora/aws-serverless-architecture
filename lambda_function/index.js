import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

// Configure the region
AWS.config.update({ region: 'ap-southeast-1' }); // change region as needed

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: name, email, message' }),
      };
    }

    const id = uuidv4();

    const params = {
      TableName: 'contacts',
      Item: {
        id,
        name,
        email,
        message,
      },
    };

    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Contact saved successfully', id }),
    };
  } catch (error) {
    console.error('Error saving contact:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not save contact' }),
    };
  }
};
