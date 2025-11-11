import config from "../config/config";

const allowedOrigins = [
  `${config.FRONT_END_URL}`, // your local frontend (e.g. Vite)
  "https://your-production-frontend.com",
  "http://localhost:5000",
  "http://localhost:3000",
];

// export const corsOption = {
//   origin: (
//     origin: string | undefined,
//     callback: (err: Error | null, allow?: boolean) => void
//   ) => {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);

//     const allowedOrigins: string[] = [
//       "http://localhost:3000",
//       "http://localhost:5000",
//       // "http://127.0.0.1:3000",
//     ];

//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error("Not allowed by CORS"), false);
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
// };

export const corsOption = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};
