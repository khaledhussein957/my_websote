import express from "express";
import jwt from "jsonwebtoken";

import ENV from "../config/ENV";

export interface AuthenticatedRequest extends express.Request {
  user?: { id: string };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).send("Missed token from cookies Unauthorized");
    }

    // The payload is { id: ... }
    const decode = jwt.verify(token, ENV.JWT_SECRET as string) as { id: string };

    if (!decode || !decode.id) {
      return res.status(401).send("Error happen Unauthorized");
    }

    req.user = { id: decode.id };

    next();
  } catch (err) {
    console.log("Error in auth middleware:", err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
