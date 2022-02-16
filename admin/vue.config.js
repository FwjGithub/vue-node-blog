module.exports = {
    outputDir: 'dist',  //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        proxy: {
            '/admin': {
              target: 'http://localhost:8888/', //API服务器的地址
              changeOrigin: true, // 是否跨域
            },
        },
    }
}