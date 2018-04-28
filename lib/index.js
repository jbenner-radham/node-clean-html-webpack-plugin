const cleaner = require('clean-html');

module.exports = class CleanHtmlWebpackPlugin {
    constructor(options={}) {
        this.options = options || {};
    }

    apply(compiler) {
        // Webpack 4.x
        if (compiler.hooks) {
            this.applyForWebpack4(compiler);
        // Webpack <=3
        } else {
            this.applyForWebpack3(compiler);
        }
    }

    cleanHtml(htmlPluginData, callback) {
        cleaner.clean(htmlPluginData.html, this.options, (html) => {
            htmlPluginData.html = html;

            callback(null, htmlPluginData);
        });
    }

    applyForWebpack3(compiler) {
        compiler.plugin('compilation', (compilation) => {
            compilation.plugin(
                'html-webpack-plugin-after-html-processing',
                this.cleanHtml.bind(this)
            );
        });
    }

    applyForWebpack4(compiler) {
        compiler.hooks.compilation.tap('CleanHtmlWebpackPlugin', (compilation) => {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
                'CleanHtmlWebpackPlugin',
                this.cleanHtml.bind(this)
            );
        });
    }
}
