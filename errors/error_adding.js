import {errorCodes} from "../constants/error_codes";
import {buildError} from "./build-error";

export const errorAdding = () => buildError(errorCodes.ADDING);
