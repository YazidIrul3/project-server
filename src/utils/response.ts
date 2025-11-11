import { Response } from "express";

export const successResponse = (
  res: Response,
  data: any,
  message: string = "Success",
  status: number = 200
) => {
  res.status(status).json({ success: true, error: false, message, data });
};

export const errorResponse = (
  res: Response,
  status: number,
  message: string = "Error"
) => {
  res.status(status).json({ success: false, error: true, message });
};
