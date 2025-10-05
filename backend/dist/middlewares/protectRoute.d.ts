import express from "express";
export interface AuthenticatedRequest extends express.Request {
    user?: {
        id: string;
    };
}
export declare const authMiddleware: (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => express.Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=protectRoute.d.ts.map