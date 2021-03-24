const path = require("path");

module.exports = {
    entry: {
        main: "./src/js/index.js",
        search: "./src/js/components/search.js",
        tabs: './src/js/components/tabs.js', 
        auth: "./src/js/pages/auth.js",
        helpful: "./src/js/pages/helpful.js",
        faqSearch: "./src/js/pages/faqSearch.js",
        guidesSearch: "./src/js/pages/guidesSearch.js",
        questions: './src/js/pages/questions.js',
        activateQuestions: './src/js/components/activateQuestions.js',
        modal: './src/js/components/modal.js'
    },

    output: {
        filename: "[name].js",
        chunkFilename: "[name].js",
        publicPath: "/"
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    enforce: true
                }
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    query: {
                        presets: [
                            ["@babel/preset-env", { modules: false }]
                        ]
                    }
                }
            }
        ]
    },

    resolve: {
        alias: {
            "%modules%": path.resolve(__dirname, "src/blocks/modules"),
            "%components%": path.resolve(__dirname, "src/blocks/components")
        }
    }
};
