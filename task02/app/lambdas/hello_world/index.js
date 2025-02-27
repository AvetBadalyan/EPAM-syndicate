exports.handler = async event => {
  const path = event.rawPath || event.path;
  const method = event.httpMethod || event.requestContext.http.method;

  if (path === '/hello' && method === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello from Lambda' }), // ✅ Correct format
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`,
    }),
  };
};
