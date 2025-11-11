import helmet from "helmet";

export const helmetConfig = helmet({
  // ❌ Disable CSP for JSON APIs (no HTML, no scripts)
  contentSecurityPolicy: false,

  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: true,

  // 🧠 Cross-Origin isolation (safe defaults)
  // crossOriginOpenerPolicy: { policy: "same-origin" },
  // crossOriginResourcePolicy: { policy: "cross-origin" },
  // crossOriginEmbedderPolicy: true,
  // 🧱 Prevent clickjacking
  frameguard: { action: "deny" },

  // 🔒 Remove X-Powered-By: Express
  hidePoweredBy: true,

  // ✅ Force HTTPS (only effective if you're serving over HTTPS)
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },

  // 🚫 Prevent MIME sniffing
  noSniff: true,

  // 🕵️ Prevent referrer leakage
  referrerPolicy: { policy: "no-referrer" },

  // 🧩 Allow cross-origin embedding safely
});

/*
untuk production

export const helmetConfig = helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "img-src": ["'self'", "https:", "data:"],
      "script-src": ["'self'", "https:", "'unsafe-inline'"],
      "connect-src": ["'self'", "https://accounts.google.com", "https://www.googleapis.com"],
      "frame-src": ["'self'", "https://accounts.google.com"],
    },
  },
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }, // ✅ penting untuk OAuth popups
  crossOriginResourcePolicy: { policy: "same-origin" },
  crossOriginEmbedderPolicy: false, // ⚠️ jangan aktifkan jika pakai OAuth
  frameguard: { action: "deny" },
  hidePoweredBy: true,
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  noSniff: true,
  referrerPolicy: { policy: "no-referrer" },
});
*/

/*
import config from "../config/config";
import helmet from "helmet";

const isDevelopment = config.NODE_ENV === "development";
const isProduction = config.NODE_ENV === "production";

const helmetConfig = isProduction
  ? helmet({
      // Production configuration (your commented one)
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "default-src": ["'self'"],
          "img-src": ["'self'", "https:", "data:"],
          "script-src": ["'self'", "https:"],
          "connect-src": [
            "'self'",
            "https://accounts.google.com",
            "https://www.googleapis.com",
          ],
          "frame-src": ["'self'", "https://accounts.google.com"],
        },
      },
      crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
      crossOriginResourcePolicy: { policy: "same-origin" },
      crossOriginEmbedderPolicy: false,
      frameguard: { action: "deny" },
      hidePoweredBy: true,
      hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
      noSniff: true,
      referrerPolicy: { policy: "no-referrer" },
    })
  : helmet({
      // Development configuration
      contentSecurityPolicy: false, // Or use the permissive CSP above
      crossOriginOpenerPolicy: { policy: "same-origin" },
      crossOriginResourcePolicy: { policy: "cross-origin" },
      crossOriginEmbedderPolicy: false,
      frameguard: { action: "deny" },
      hidePoweredBy: true,
      hsts: false, // Important: disable in development
      noSniff: true,
      referrerPolicy: { policy: "no-referrer" },
    });

export { helmetConfig };

*/
