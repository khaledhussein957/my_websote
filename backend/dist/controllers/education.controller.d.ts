import { type Request, type Response } from "express";
import type { AuthenticatedRequest } from "../middlewares/protectRoute.ts";
export declare const getEducations: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getEducation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addEducation: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateEducation: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteEducation: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=education.controller.d.ts.map