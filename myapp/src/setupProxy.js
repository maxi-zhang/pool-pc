const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/user/user/', {
        target: "http://192.168.1.212:8080/",
        changeOrigin: true,
    }));
    app.use(proxy('/user/setType', {
        target: "http://192.168.1.212:8080/",
        changeOrigin: true,
    }));
    app.use(proxy('/user/', {
        target: "https://devpuser1.arsyun.com",
        changeOrigin: true,
    }));
    app.use(proxy('/basic/', {
        target: "https://devpuser1.arsyun.com",
        changeOrigin: true,
    }));
    app.use(proxy('/pool/', {
        target: "http://192.168.1.212:8080/",
        changeOrigin: true,
    }));
    app.use(proxy('/device/', {
        target: "http://192.168.1.212:8080/",
        changeOrigin: true,
    }));

};