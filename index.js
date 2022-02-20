const { QuestionController } = require('./question.js');

exports.handler = async (event, context, callback) => {
    
    const { httpMethod, path, headers } = event;
    
    console.log('Debug: ', JSON.stringify(event, "  "));
    
    if (path.startsWith('/numitor/question')) {
        return await new QuestionController().processRequest(httpMethod, path, headers);
    }
    
    if (path.startsWith('/numitor/answer')) {
        
    }
    
    return {
        statusCode: 400,
        body: 'Bad Request: invalid path',
    };
};
