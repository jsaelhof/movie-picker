import axios from "axios";
import noop from "lodash/noop";
import { api } from "../constants/api";

export const graphql =
  (onError) =>
  async (query, variables = {}, onSuccess = noop) => {
    try {
      console.log(query, variables);
      const response = await axios.post(api.GRAPHQL, {
        query,
        variables,
      });

      if (response.data.errorCode) {
        let errorMessage;
        switch (response.data.errorCode) {
          case "001":
            errorMessage = "No movies are available to pick from.";
            break;
          case "101":
            errorMessage = "Title is required to add a movie";
            break;
          case "201":
            errorMessage = "Id is required to delete a movie";
            break;
          default:
            errorMessage = `Unknown error code: ${response.data.errorCode}`;
            break;
        }
        onError(errorMessage);
      } else {
        onSuccess(response.data);
      }
    } catch (err) {
      console.error(err);
      onError(`Unknown Error\n${err}`);
    }
  };
