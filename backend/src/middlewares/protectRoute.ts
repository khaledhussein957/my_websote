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
    const authHeader = req.headers["authorization"] as string | undefined;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : undefined;
    if (!token) {
      return res.status(401).send("Missing Authorization header. Unauthorized");
    }

    // The payload is { id: ... }
    const decode = jwt.verify(token, ENV.JWT_SECRET as string) as { id: string };

    if (!decode || !decode.id) {
      return res.status(401).send("Invalid token. Unauthorized");
    }

    req.user = { id: decode.id };

    next();
  } catch (err) {
    console.log("Error in auth middleware:", err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
