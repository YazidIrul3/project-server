import express from "express";
import helmet from "helmet";
import { apiKeyMiddleware } from "./middleware/apiKeyMiddleware";
import subscriptionRouter from "./subcription/subscription.controller";
import limiter from "./libs/express-rate-limit";
import config from "./config/config";
import { logger } from "./libs/winston";
import { errorHandler } from "./middleware/error-handler";
import { corsOption } from "./libs/cors";
// import userRouter from "./user/user.controller";
import { helmetConfig } from "./libs/helmet";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./libs/auth";
import userRouter from "./user/user.controller";

const cors = require("cors");
const app = express();

// package libaries
app.use(express.json());

// security
app.use(limiter);
app.use(cors(corsOption));
app.use(helmetConfig);

// middleware
app.use(errorHandler);

app.all("/api/auth/*splat", toNodeHandler(auth)); // router
app.use("/api/v1/auth", userRouter);

app.use("/api/v1/subscription", apiKeyMiddleware, subscriptionRouter);

// start the server
const server = app.listen(config.PORT, () => {
  logger.info(`server running on port ${config.PORT}`);
});

// end the server
process.on("unhandledRejection", (err: Error) => {
  logger.error("UNHANDLED REJECTION 💥 Shutting down...");
  logger.error(err);
  server.close(() => process.exit(1));
});
