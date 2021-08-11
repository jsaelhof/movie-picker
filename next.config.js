module.exports = {
  env: {
    GRAPHQL_URL: "/api/graphql",
    OMDB_API_URL: "http://www.omdbapi.com/",
    AUTH0_BASE_URL: process.env.VERCEL_URL || process.env.AUTH0_BASE_URL,
  },
};
