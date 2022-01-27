const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://zland-backend.herokuapp.com',
            changeOrigin: true,
            pathRewrite: {
                "^/api": "/"
            }
        })
    );
};