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
                return this.processGetNext(path);
            }
            return this.processGetAdmin(path);
        }
    }
    
    async processGetNext(path) {
        if (path !== '/numitor/question/next') {
            return {
                statusCode: 400,
                body: 'Bad Request: you can only get a random question'
            }
        }
        // Choose one question identifiers
        const randomId = "1";
        // Get the question data from DynamoDB
        const ddbResponse = await ddbClient.get({ TableName: 'numitor.questions', Key: { id: randomId } }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(ddbResponse.Item),
        }
    }
    
    async processGetAdmin(path) {
        return {
            statusCode: 501,
            body: 'Not Implemented'
        }
    }
}

module.exports = {
    QuestionController,
};