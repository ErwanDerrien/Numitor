const uuid = require('uuid');

const AWS = require('aws-sdk');
const ddbClient = new AWS.DynamoDB.DocumentClient({
    region: 'ca-central-1',
    credentials: {
        accessKeyId: process.env.DDB_ACCESS_KEY,
        secretAccessKey: process.env.DDB_SECRET_KEY,
    },
});

class QuestionController {
    async processRequest(httpMethod, path, headers, body) {
        if (httpMethod === 'GET') {
            if (headers.authorization === undefined) {
                return this.processGetNext(path);
            }
            return this.processGetAdmin(path);
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

    async processGetNext(path) {
        if (path !== '/numitor/question/next') {
            return {
                statusCode: 400,
                body: 'Bad Request: you can only get a random question',
            };
        }

        const randomId = uuid.v4();

        var params = {
            Limit: 1,
            TableName: 'numitor.questions',
            ExclusiveStartKey: {
                id: randomId,
            },
        };
3
        var ddbResponse = await ddbClient.scan(params).promise();

        if (ddbResponse.Items.length === 0) {
            delete params.ExclusiveStartKey;
            ddbResponse = await ddbClient.scan(params).promise();
        }

        return {
            statusCode: 200,
            body: JSON.stringify(ddbResponse.Items[0]),
        };
    }

    async processPost(path, body) {
        body = JSON.parse(body);

        const id = body.id;
        const question = body.question;
        const answers = body.answers;
        const points = body.points;

        var params = {
            TableName: 'numitor.questions',
            Item: {
                id: id,
                question: question,
                answers: answers,
                points: points,
            },
        };

        const ddbResponse = await ddbClient.put(params).promise();

        return {
            statusCode: 201,
            body: id,
        };
    }

    async processGetAdmin(path) {
        return {
            statusCode: 501,
            body: 'Not Implemented',
        };
    }
}

module.exports = {
    QuestionController,
};
