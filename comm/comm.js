import axios from "axios";
import noop from "lodash/noop";

export const comm = (onError) => async (endpoint, body, onSuccess = noop) => {
  try {
    const response = await axios.post(endpoint, body);

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
    onError(`Unknown Error\nerr`);
  }
};
