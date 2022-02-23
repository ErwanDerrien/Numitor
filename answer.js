const AWS = require('aws-sdk');
const ddbClient = new AWS.DynamoDB.DocumentClient({
    region: 'ca-central-1',
    credentials: {
        accessKeyId: process.env.DDB_ACCESS_KEY,
        secretAccessKey: process.env.DDB_SECRET_KEY,
    },
});

class AnswerController {
    async processRequest(httpMethod, path, headers, body) {
        if (httpMethod === 'GET') {
            if (headers.authorization === undefined) {
                return this.processGet(path);
            }
            return {
                statusCode: 501,
                body: 'Not Implemented',
            };
        }
        if (httpMethod === 'POST') {
            if (headers.authorization === undefined) {
                return this.processPost(path, body);
            }
            return {
                statusCode: 501,
                body: 'Not Implemented',
            };
        }
        return {
            statusCode: 501,
            body: 'Not Implemented',
        };
    }

    async processGet(path) {
        const id = path.substring(path.lastIndexOf('/') + 1);

        const ddbResponse = await ddbClient.get({ TableName: 'numitor.answers', Key: { id: id } }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(ddbResponse.Item),
        };
    }

    async processPost(path, body) {
        
        body = JSON.parse(body);
        
        const id = body.id;
        const index = body.index;

        var params = {
            TableName: 'numitor.answers',
            Item: {
                id: id,
                index: index,
            },
        };

        const ddbResponse = await ddbClient.put(params).promise();

        return {
            statusCode: 201,
            body: JSON.stringify(id),
        };
    }
}

module.exports = {
    AnswerController,
};
