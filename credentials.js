const AWS = require('aws-sdk');
const ddbClient = new AWS.DynamoDB.DocumentClient({
    region: 'ca-central-1',
    credentials: {
        accessKeyId: process.env.DDB_ACCESS_KEY,
        secretAccessKey: process.env.DDB_SECRET_KEY,
    },
});

class CredentialsController {
    async processRequest(httpMethod, path, headers, body) {
        if (httpMethod === 'GET') {
            if (headers.authorization === undefined) {
                return this.processGet(path, body);
            }
        }
        
        return {
            statusCode: 501,
            body: 'Not Implemented',
        };
    }
    
    async processGet(path, body) {
        body = JSON.parse(body);

        const id = body.id;
        const password = body.password;

        const ddbResponse = await ddbClient.get({ TableName: 'numitor.credentials', Key: { id: id } }).promise();

        if (ddbResponse.Item?.password !== password) {
            return {
                statusCode: 401,
                body: 'Invalid Credentials',
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(id),
        };
    }
}

module.exports = {
    CredentialsController,
};
