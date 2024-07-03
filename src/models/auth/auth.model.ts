import Joi from "joi";
import { PASSWORD_REGEX } from "../../shared/constants";

export const LoginRequest = Joi.object({
  email: Joi.string().required().max(150),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).max(16).required(),
});

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
}

export interface IMeResponse {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}