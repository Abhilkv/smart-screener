// Validation errors type
export interface IValidationErrors {
  [key: string]: IValidationError;
}

// Validation error type
export interface IValidationError {
  property: string;
  constraints: string[];
}

export default class ApiException {
  status: number;
  statusText: string;
  message: string;
  validationErrors: IValidationErrors;

  constructor(
    status: number,
    statusText: string,
    message: string,
    validationErrors: IValidationErrors,
  ) {
    this.status = status;
    this.statusText = statusText;
    this.message = message;
    this.validationErrors = validationErrors;
  }
}
