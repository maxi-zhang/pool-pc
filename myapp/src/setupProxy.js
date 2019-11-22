const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/user/', {
        target: "https://devpuser1.arsyun.com",
        changeOrigin: true,
    }));
    app.use(proxy('/basic/', {
        target: "https://devpuser1.arsyun.com",
        changeOrigin: true,
    }));
};