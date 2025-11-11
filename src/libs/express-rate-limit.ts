import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import type { Request, Response, NextFunction } from "express";

function safeIpKeyGenerator(req: Request): string {
  // Normalisasi IPv6 seperti ipKeyGenerator aslinya
  const ip = req.ip?.replace(/^::ffff:/, "") || "unknown";
  return ip;
}
// Rate limiter configuration (best practice)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 60, // max 60 requests per IP per window
  standardHeaders: "draft-8", // modern RateLimit-* headers
  legacyHeaders: false, // disable X-RateLimit-* headers
  statusCode: 429, // HTTP status code when limit exceeded

  // Generate unique key (safe behind proxies)
  keyGenerator: (req: Request): string => {
    const forwarded = req.headers["api-key"];
    if (typeof forwarded === "string") {
      return forwarded.split(",")[0].trim();
    }
    return safeIpKeyGenerator(req);
  },

  // Custom handler for JSON response
  handler: (
    req: Request,
    res: Response,
    next: NextFunction,
    options: any
  ): void => {
    res.status(options.statusCode).json({
      success: false,
      error: "Too many requests. Please wait before trying again.",
      limit: options.limit,
      windowMs: options.windowMs,
    });
  },
});

export default limiter;
