module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', // CSS dosyalarını style tag olarak ekler
                    'css-loader'    // CSS dosyalarını JavaScript'e çevirir
                ]
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',       // Modern JavaScript'i eski tarayıcılarla uyumlu hale getirir
                            '@babel/preset-react',     // JSX'i işler
                            '@babel/preset-typescript' // TypeScript'i JavaScript'e çevirir
                        ]
                    }
                }
            }
        ]
    },
    externals: {
        'react': 'react',
        'react-dom': 'react-dom'
    },
};
