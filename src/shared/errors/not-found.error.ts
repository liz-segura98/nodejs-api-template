import { CustomError } from "./custom.error";
import { ApiErrorDetailResponse } from "../interfaces/api-response.interface";
import { ErrorCode } from "../enums/error.enum";

export class NotFoundError extends CustomError {
  private static readonly _statusCode = 404;
  private readonly _code: number;
  private readonly _logging: boolean;
  private readonly _error_code: string;
  private readonly _context: string[];

  constructor(params?: { message?: string, logging?: boolean, context?: string[], status?: number, code?: string }) {
    const { message, logging, status, code } = params || {};

    super(message || ErrorCode.NOT_FOUND);
    this._code = status || NotFoundError._statusCode;
    this._logging = logging || false;
    this._context = params?.context || [];
    this._error_code = code || ErrorCode.NOT_FOUND;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  get errors(): ApiErrorDetailResponse {
    return {
      code: this._error_code,
      status: this._code,
      message: this.message,
      details: this._context,
    };
  }

  get statusCode() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }
}