module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-storysource",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-knobs",
    "@storybook/addon-viewport"
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
			use: [
				{
					loader: require.resolve("react-docgen-typescript-loader")
				}
			]
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
}