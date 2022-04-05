export const KEYCLOAK_CONFIG = {
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
    url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
    requestTokenUrl: `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/auth`,
    issuer: "http://0.0.0.0:8080/realms/next/protocol/openid-connect/auth"
}