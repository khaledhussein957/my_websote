import type { Request, Response, NextFunction } from "express";

import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../config/arcjet";

export const arcjetProtection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Ensure remoteAddress is always a string
    const arcjetReq = {
      ...req,
      socket: {
        ...req.socket,
        remoteAddress: req.socket.remoteAddress ?? ""
      }
    };
    const decision = await aj.protect(arcjetReq);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Rate limit exceeded. Please try again later." });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied." });
      } else {
        return res.status(403).json({
          message: "Access denied by security policy.",
        });
      }
    }

    // check for spoofed bots
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected.",
      });
    }

    next();
  } catch (error) {
    console.log("Arcjet Protection Error:", error);
    next();
  }
};