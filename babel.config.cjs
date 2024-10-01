module.exports = (api) => {
  const isTest = api.env('test');        // Detects if the environment is Jest
  const isCypress = api.env('cypress');  // Detects if the environment is Cypress

  return {
    presets: [
      '@babel/preset-env',    // For transpiling modern JavaScript (ES6+)
      '@babel/preset-react',  // For transpiling React JSX
    ],
    plugins: [
      isCypress && 'istanbul',               // Only include istanbul for Cypress coverage
      isCypress && 'transform-class-properties',
    ].filter(Boolean),  // Filters out any false values (like if istanbul is false for Jest)
  };
};
