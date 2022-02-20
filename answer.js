const AWS = require('aws-sdk');
const ddbClient = new AWS.DynamoDB.DocumentClient({
    region: 'ca-central-1',
    credentials: {
        accessKeyId: process.env.DDB_ACCESS_KEY,
        secretAccessKey: process.env.DDB_SECRET_KEY
    }
});

class QuestionController {
    
    async processRequest(httpMethod, path, headers) {
        if (httpMethod === 'GET') {
            if (headers.authorization === undefined) {
                return this.processGet(path);
            }
            return {
                statusCode: 501,
                body: 'Not Implemented'
            }
        }
    }
    
    async processGet(path) {
        return {
            statusCode: 501,
            body: 'Not Implemented'
        }
    }
}

module.exports = {
    QuestionController,
};