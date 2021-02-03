import {errorCodes} from "../constants/error_codes";
import {buildError} from "./build-error";

export const errorDeleting = () => buildError(errorCodes.DELETING);
