module.exports = {
    singleQuote: true,
    useTabs: false,
    semi: false,
    trailingComma: 'none',
    overrides: [
        {
            files: '*',
            options: {
                tabWidth: 2,
                bracketSpacing: true
            }
        },
        {
            files: '*.yml',
            options: {
                tabWidth: 2
            }
        }
    ]
}
