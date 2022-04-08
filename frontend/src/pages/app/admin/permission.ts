import { NextRequest } from 'next/server'
import { JWT } from "next-auth/jwt";


export function isAdmin(token: JWT | null, req: NextRequest) {
    // console.log(typeof token?.roles)
    if(Array.isArray(token?.roles)){
        if(token?.roles.length) {
            return token?.roles.includes('admin')
        }
    }
    

    return false;
}