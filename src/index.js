
async function sanitizer(event, context) {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda! 2.0'),
    };
    return response;
}

exports.handler = sanitizer