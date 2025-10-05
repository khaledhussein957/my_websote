export declare const validatePhoneNumber: (phone: string) => {
    valid: boolean;
    message: string;
    operator?: never;
    country?: never;
} | {
    valid: boolean;
    operator: string;
    country: string[];
    message: string;
} | undefined;
//# sourceMappingURL=phoneValidate.d.ts.map