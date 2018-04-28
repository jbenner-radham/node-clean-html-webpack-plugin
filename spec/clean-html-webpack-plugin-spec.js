'use strict';

const { any } = jasmine;
const CleanHtmlWebpackPlugin = require('../');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

describe('clean-html-webpack-plugin', function () {
    it('is a class/function', function () {
        expect(CleanHtmlWebpackPlugin).toEqual(any(Function));
    });

    it('runs with no options passed to it', function (done) {
        const config = {
            entry: path.join(__dirname, 'fixtures', 'entry.js'),
            mode: 'none',
            output: {
                path: path.join(__dirname, '..', 'dist')
            },
            plugins: [
                new HtmlWebpackPlugin(),
                new CleanHtmlWebpackPlugin()
            ]
        };
        const callback = (err, stats) => {
            if (err) {
                fail(err.stack || err);
            }

            if (stats.hasErrors()) {
                fail(stats.toJson().errors);
            }

            done();
        };

        expect(() => webpack(config, callback)).not.toThrow();
    });

    describe('#apply', function () {
        it('is a function', function () {
            expect(CleanHtmlWebpackPlugin.prototype.apply).toEqual(any(Function));
        });

        // it('returns `undefined`', function () {
        //     expect(new CleanHtmlWebpackPlugin().apply()).toBe(undefined);
        // });
    });
});
