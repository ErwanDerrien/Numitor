const { QuestionController } = require('./question.js');
const { AnswerController } = require('./answer.js');

exports.handler = async (event, context, callback) => {
    
    const { httpMethod, path, headers } = event;
    
    console.log('Debug: ', JSON.stringify(event, "  "));
    
    if (path.startsWith('/numitor/question')) {
        return await new QuestionController().processRequest(httpMethod, path, headers);
    }
    
    if (path.startsWith('/numitor/answer')) {
        return await new AnswerController().processRequest(httpMethod, path, headers);
    }
    
    return {
        statusCode: 400,
        body: 'Bad Request: invalid path',
    };
};
