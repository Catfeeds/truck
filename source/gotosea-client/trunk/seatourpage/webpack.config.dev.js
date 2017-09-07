var path = require('path'),
    STYLES_PATH = path.resolve(__dirname, 'public/styles'),
    SRC_DIR = path.join(__dirname, 'public'),
    webpack = require("webpack"),
    CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    IgnorePlugin = webpack.IgnorePlugin,
    ProvidePlugin = webpack.ProvidePlugin;

module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        // lazy: true,
        noInfo: false,
        // 文件更新自动刷新页面
        // watchContentBase : true,
        // stats : true,
        // progress: true,
        overlay: {
            warnings: true,
            errors: true
        },
        compress : true,
        host : '192.168.0.117',
        port : 80,
        proxy : {
            '/fishsea': {
                target:"http://192.168.0.117:8080",
                secure: false,
                changeOrigin: true
            },
        },
    },
    devtool: "eval-source-map", //生成sourcemap,便于开发调试
    entry: {
        'bundle': './public/scripts/index.js',
    },
    output: {
        path: path.join(__dirname, "build/"), //文件输出目录
        publicPath: "/build/", //用于配置文件发布路径，如CDN或本地服务器
        chunkFilename: 'chunkes/[name].chunk.js',
        filename: "scripts/[name].js", //根据入口文件输出的对应多个文件名
    },
    module: {
        //各种加载器，即让各种文件格式可用require引用
        rules: [
            {
                test: /\.js?$/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                // use: ExtractTextPlugin.extract( [ 'css', 'autoprefixer' ] ),
                use: ExtractTextPlugin.extract([
                    'css',
                    {
                        loader: 'postcss',
                        options: {
                            plugins: (loader) => [
                                require('autoprefixer')(),
                                // require('cssnano')()
                            ]
                        }
                    }
                ]),
                include: STYLES_PATH
            },
            {
                //使生效：需要在js中引入资源
                test: /\.less$/,
                // use: ExtractTextPlugin.extract( [ 'css', 'autoprefixer', 'less' ] ),
                use: ExtractTextPlugin.extract([ 
                    'css', 
                    {
                        loader: 'postcss',
                        options: {
                            plugins: (loader) => [
                                require('autoprefixer')(),
                                // require('cssnano')()
                            ]
                        }
                    }, 
                    'less',
                ]),
                include: STYLES_PATH
            },
        ],
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    plugins: [
        new CommonsChunkPlugin('shared'),
        new ExtractTextPlugin({
            filename : 'styles/[name].css',
            disable : false,
            allChunks: true,
        }),
        new IgnorePlugin(/.+\.js/, /\/public\/lib/),
        new ProvidePlugin({
            config: "config"
        }),

        // new webpack.optimize.UglifyJsPlugin({
        //     output: {
        //         comments: false,
        //     },
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    ],
    resolve: {
        //配置别名，在项目中可缩减引用路径
        alias: {
            scripts: SRC_DIR + "/scripts",
            components: SRC_DIR + "/scripts/components",
            containers: SRC_DIR + "/scripts/containers",            
            actions: SRC_DIR + "/scripts/actions",
            reducers: SRC_DIR + "/scripts/reducers",
            utils: SRC_DIR + "/scripts/utils",
            images: SRC_DIR + "/images",
            styles: SRC_DIR + "/styles",
            config: path.resolve(__dirname, "config/config.dev.js"),
        }
    }
};
