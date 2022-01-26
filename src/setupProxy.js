const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: '${API_URL}',
            changeOrigin: true,
            pathRewrite: {
                "^/api": "/"
            }
        })
    );
};