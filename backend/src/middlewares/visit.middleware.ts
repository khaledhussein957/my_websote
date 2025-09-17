import type { Request, Response, NextFunction } from "express";
import useragent from "useragent";
import Visit from "../models/visit.model.ts";

export const logVisit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ip =
      (req.headers["x-forwarded-for"] as string) ||
      req.socket.remoteAddress ||
      "unknown";
    const { method, originalUrl } = req;
    const uaString = req.headers["user-agent"] || "unknown";
    const deviceInfoHeader = req.headers["x-device-info"] || "";

    let browserName = "";
    let osName = "";
    let deviceName = "";

    // ✅ Mobile app detection
    if (
      uaString.includes("ReactNative") ||
      uaString.includes("Expo") ||
      deviceInfoHeader === "mobile"
    ) {
      const platform = (req.headers["x-platform"] as string) || "Mobile";
      const deviceModel =
        (req.headers["x-device-model"] as string) || "Unknown Device";

      browserName = "Mobile App";
      osName = platform;
      deviceName = `${deviceModel} (${platform})`;
    } else {
      // ✅ Web browser detection
      if (/Edg/i.test(uaString)) {
        browserName = "Edge";
      } else if (/Chrome/i.test(uaString)) {
        browserName = "Chrome";
      } else if (/Firefox/i.test(uaString)) {
        browserName = "Firefox";
      } else if (/Safari/i.test(uaString)) {
        browserName = "Safari";
      } else {
        browserName = "Unknown";
      }

      const agent = useragent.parse(uaString);
      osName = agent.os.toString();
      deviceName = `${browserName} on ${agent.os.family}`;
    }

    // ✅ Save visit log
    await Visit.create({
      ip,
      url: originalUrl,
      method,
      userAgent: uaString,
      browser: browserName,
      os: osName,
      device: deviceName,
      timestamp: new Date(),
    });
  } catch (err) {
    console.error("Failed to log visit:", err);
  }

  next();
};
