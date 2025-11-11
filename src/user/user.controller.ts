// import express, { NextFunction, Request, Response } from "express";
// import { logger } from "../libs/winston";
// import { authWithGoogle, putUser, userProfile } from "./user.service";
// import { authorizationUrl, oauth2, oauth2Client } from "../libs/oauth";
// import { oauth2_v2 } from "googleapis";
// import { successResponse } from "../utils/response";
// import { AppError } from "../utils/appError";
// import config from "../config/config";
// import { validate } from "../middleware/validate";
// import { updateUserSchema } from "../schemas/user";
// import { apiKeyMiddleware } from "../middleware/apiKeyMiddleware";
// import { auth } from "../libs/auth";
// import { fromNodeHeaders } from "better-auth/node";

// const userRouter = express.Router();
// const JSONbig = require("json-bigint");

// userRouter.post(
//   "/google/signin",
//   apiKeyMiddleware,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       res.header("Access-Control-Allow-Origin", config.FRONT_END_URL);
//       res.header("Referrer-Policy", "no-referrer-when-downgrade");
//       res.setHeader(
//         "Content-Security-Policy",
//         "default-src 'self'; connect-src 'self' http://localhost:3000 https://accounts.google.com;"
//       );
//       // res.header("Access-Control-Allow-Credentials", "true");

//       const { url, redirect } = await auth.api.signInSocial({
//         body: {
//           provider: "google",
//           callbackURL: `${config.BACKEND_URL}/api/v1/auth/google/callback`,
//           scopes: ["email", "profile"],
//         },
//       });

//       res.json({ url });
//     } catch (error) {
//       logger.error(error);

//       next(error);
//     }
//   }
// );

// userRouter.get(
//   "/google/callback/",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await auth.api.signInSocial({
//         body: {
//           provider: "google",
//         },
//         query: req.query, // penting, untuk ambil ?code=...&state=...
//       });

//       res.redirect(`${config.FRONT_END_URL}/`);
//     } catch (error) {
//       logger.error(error);

//       next(error);
//     }
//   }
// );

// userRouter.get("/me", async (req, res) => {
//   const session = await auth.api.getSession({
//     headers: fromNodeHeaders(req.headers),
//   });
//   return res.json(session);
// });

// userRouter.get(
//   "/user/:id",
//   apiKeyMiddleware,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { id } = req?.params;
//       const data = await userProfile(id);

//       res.send(
//         JSONbig.stringify({
//           data,
//           error: false,
//           success: true,
//           message: "Profile fetched successfully",
//         })
//       );
//       return;
//     } catch (error) {
//       logger.error(error);

//       next(error);
//     }
//   }
// );

// userRouter.put(
//   "/:id",
//   apiKeyMiddleware,
//   validate(updateUserSchema),
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { body, params } = req;

//       await putUser(body, params?.id);

//       successResponse(res, 201, "Update profile successfully");
//     } catch (error) {
//       logger.error(error);
//       next(error);
//     }
//   }
// );

// userRouter.post(
//   "/logout",
//   apiKeyMiddleware,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await auth.api.signOut({
//         headers: Object.fromEntries(
//           Object.entries(req.headers).map(([k, v]) => [k, String(v)])
//         ),
//       });

//       logger.info("logout sucess");

//       res.status(200).json({ message: "Logged out successfully" });
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   }
// );

// export default userRouter;
