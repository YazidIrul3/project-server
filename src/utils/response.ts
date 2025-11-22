import { Response } from "express";

export const successResponse = (
  res: Response,
  message: string,
  statusCode: number,
  data?: any
) => {
  return res.status(statusCode).json({
    success: true,
    error: false,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  status: number,
  message: string = "Error"
) => {
  res.status(status).json({ success: false, error: true, message });
};
