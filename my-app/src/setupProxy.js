const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/user/login', {
        target: "https://devpuser.arsyun.com",
        changeOrigin: true,
    }));
};