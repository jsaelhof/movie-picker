const { PHASE_PRODUCTION_SERVER } = require("next/constants");

module.exports = (phase) => ({
  env: {
    PHASE: phase,
    IS_PROD: phase === PHASE_PRODUCTION_SERVER,
    GRAPHQL_URL: "/api/graphql",
    OMDB_API_URL: "http://www.omdbapi.com/",
  },
});
