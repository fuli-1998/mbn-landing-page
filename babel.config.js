module.exports = function (api) {
  api.cache(true);
  
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return {
    presets: ["next/babel"],
    plugins: isDevelopment
      ? [
          [
            "@locator/babel-jsx/dist",
            {
              env: "development",
            },
          ],
        ]
      : [],
  };
};
