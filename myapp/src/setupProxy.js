const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/user/user/', {
        target: "https://testpool.arsyun.com/",
        changeOrigin: true,
    }));
    app.use(proxy('/user/setType', {
        target: "https://testpool.arsyun.com/",
        changeOrigin: true,
    }));
    app.use(proxy('/user/deviceUser', {
        target: "https://testpool.arsyun.com/",
        changeOrigin: true,
    }));
    app.use(proxy('/user/deviceUser', {
        target: "https://testpool.arsyun.com/",
        changeOrigin: true,
    }));
    app.use(proxy('/user/', {
        target: "https://testuser2.arsyun.com",
        changeOrigin: true,
    }));
    app.use(proxy('/basic/', {
        target: "https://testuser2.arsyun.com",
        changeOrigin: true,
    }));
    app.use(proxy('/pool/', {
        target: "https://testpool.arsyun.com/",
        changeOrigin: true,
    }));
    app.use(proxy('/device/', {
        target: "https://testpool.arsyun.com/",
        changeOrigin: true,
    }));

};