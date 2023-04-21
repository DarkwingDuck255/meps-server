const allowedCors = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://meps.uz',
    'https://meps.uz',
    'http://95.46.96.80',
    'https://95.46.96.80',
    'www.meps.uz',
    'meps.uz',
  ];
  
  const cors = (req, res, next) => {
    const { origin } = req.headers;
    const { method } = req;
    const requestHeaders = req.headers['access-control-request-headers'];
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Credentials', true);
    }
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
    }
  
    return next();
  };
  
  module.exports = cors;
  