module.exports = () => ({
  swcMinify: true,
  env: {
    GRAPHQL_URL: "/api/graphql",
    OMDB_API_URL: "http://www.omdbapi.com/",
    TMDB_API_URL: "https://api.themoviedb.org/3",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
});
