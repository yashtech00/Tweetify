// filepath: types.d.ts
import 'express';

declare global {
    namespace Express {
        interface Request {
            cookies: { [key: string]: string };
        }
    }
}