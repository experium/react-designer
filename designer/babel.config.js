module.exports = api => {
    api.cache(true);

    return {
        presets: [
            '@babel/preset-react',
            ['@babel/preset-env', {
                targets: {
                    ie: '11',
                    edge: '17',
                    firefox: '60',
                    chrome: '67',
                    safari: '11.1',
                },
                useBuiltIns: 'usage',
            }]
        ],
        plugins: [
            ['css-modules-transform', {
                generateScopedName: '[name]__[local]___[hash:base64:5]'
            }],
            ['@babel/plugin-transform-runtime', {
                corejs: false,
                helpers: false,
                regenerator: true,
                useESModules: false
            }],
            ['@babel/plugin-proposal-class-properties', {
                'loose': true
            }],
            '@babel/plugin-proposal-export-default-from'
        ]
    }
}
