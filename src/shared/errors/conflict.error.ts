import { CustomError } from "./custom.error";
import { ApiErrorDetailResponse } from "../interfaces/api-response.interface";
import { ErrorCode } from "../enums/error.enum";

export class ConflictError extends CustomError {
  private static readonly _statusCode = 409;
  private readonly _code: number;
  private readonly _logging: boolean;
  private readonly _error_code: string;
  private readonly _context: string[];

  constructor(params?: { message?: string, logging?: boolean, context?: string[], status?: number, code?: string }) {
    const { message, logging, status, code } = params || {};

    super(message || ErrorCode.CONFLICT);
    this._code = status || ConflictError._statusCode;
    this._logging = logging || false;
    this._context = params?.context || [];
    this._error_code = code || ErrorCode.CONFLICT;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, ConflictError.prototype);
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