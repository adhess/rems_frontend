const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true,
            pathRewrite: {
                "^/api": "/"
            }
        })
    );
    app.use(
        '/findAddress',
        createProxyMiddleware({
            target: "http://nominatim.openstreetmap.org",
            changeOrigin: true,
            pathRewrite: {
                "^/findAddress": "/"
            }
        })
    );
};