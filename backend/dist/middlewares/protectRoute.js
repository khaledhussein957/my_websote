import express from "express";
import jwt from "jsonwebtoken";
import ENV from "../config/ENV.ts";
export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).send("Missed token from cookies Unauthorized");
        }
        // The payload is { id: ... }
        const decode = jwt.verify(token, ENV.JWT_SECRET);
        if (!decode || !decode.id) {
            return res.status(401).send("Error happen Unauthorized");
        }
        req.user = { id: decode.id };
        next();
    }
    catch (err) {
        console.log("Error in auth middleware:", err);
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};
//# sourceMappingURL=protectRoute.js.map