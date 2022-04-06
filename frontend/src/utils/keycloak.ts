import axios from 'axios';
import jwt_decode, {JwtPayload, JwtDecodeOptions} from 'jwt-decode'
import { Account } from 'next-auth';


export async function addRoles(account: Account) {
    const decodedToken: any = jwt_decode<JwtPayload>(account.access_token as string);
    
    // console.log('DECODED TOKEN',decodedToken)

    const roles = decodedToken.realm_access.roles;
    return roles;
}