import { type Request, type Response } from "express";
import { type AuthenticatedRequest } from "../middlewares/protectRoute.ts";
export declare const registerAccount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const loginAccount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const checkAuth: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logout: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const forgotPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const resetPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.controller.d.ts.map