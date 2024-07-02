import { Options, RateLimitRequestHandler, rateLimit } from 'express-rate-limit';

const ConfigRateLimit: Partial<Options> = {
  windowMs: 15 * 60 * 1000, // How long we should remember the requests in milliseconds. (here: 15 min)
  limit: 50, // Limit each IP to X requests per `window` (here, 50 request per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header (here, limit=50, remaining=50, reset=900)
  legacyHeaders: false, // Enable/Disable the `X-RateLimit-*` headers (here, disabled).
}

export const RateLimitHandler: RateLimitRequestHandler = rateLimit(ConfigRateLimit);