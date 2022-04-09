import axios from "axios";
import jwt_decode, { JwtPayload, JwtDecodeOptions } from "jwt-decode";
import { Account } from "next-auth";
import { JWT } from "next-auth/jwt";
import { verify, TokenExpiredError } from 'jsonwebtoken'

export function addRoles(account: Account) {
	const decodedToken: any = jwt_decode<JwtPayload>(
		account.access_token as string
	);

	// console.log('DECODED TOKEN',decodedToken)

	const roles = decodedToken.realm_access.roles;
	return roles;
}

export function addTokens(account: Account) {
	const access_token = account.access_token;
	const refresh_token = account.refresh_token;
	const client_id = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;
	const client_secret = process.env.NEXT_PUBLIC_KEYCLOAK_SECRET;

	return {
		access_token,
		refresh_token,
		client_id,
		client_secret,
	};
}

export function finishSession(data: { access_token: string,  refresh_token: string}) {
	try {
		const url = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;
		const client_id = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;
		const client_secret = process.env.NEXT_PUBLIC_KEYCLOAK_SECRET;
		const refresh_token = data.refresh_token;
		const access_token = data.access_token;

		const params = new URLSearchParams();
		client_id && params.append("client_id", client_id);
		client_secret && params.append("client_secret", client_secret);
		params.append("refresh_token", refresh_token);

		const config = {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		};

		axios.post(url, params, config);

        return true;
	} catch (error) {
        return false;
    }
}



export function isAdmin(token: JWT | null) {
    // console.log(typeof token?.roles)
    if(Array.isArray(token?.roles)){
        if(token?.roles.length) {
            return token?.roles.includes('admin')
        }
    }
    return false;
}

export const buildPublicKey = (public_key?: string) => "-----BEGIN PUBLIC KEY-----\n" + public_key + "\n-----END PUBLIC KEY-----"

export function isAccessTokenExpired(access_token: string) {
	const publicKey = buildPublicKey(process.env.NEXT_PUBLIC_KEYCLOAK_PUBLIC_KEY)
	try {
		verify(access_token, publicKey, {algorithms: ["RS256"]});
		return false;
	} catch (error: unknown) {
		console.log(error);
		return true;
	}
}

export async function getNewAccessTokenFromRefreshToken(refresh_token?: string) {
	const url = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/token`;
	const client_id = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;

	const params = new URLSearchParams();
	client_id && params.append('client_id', client_id);
	refresh_token && params.append('refresh_token', refresh_token);
	params.append('grant_type', 'refresh_token');
	params.append('grant_type', 'refresh_token');
	

	const res = await axios.post(url, params);
	const data = res.data;

	const newRefreshToken = data.refresh_token;
	const newAccessToken = data.access_token;

	return [newAccessToken, newRefreshToken];

}