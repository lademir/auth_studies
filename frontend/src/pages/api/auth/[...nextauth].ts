import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"
import { KEYCLOAK_CONFIG } from "../../../utils/auth"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    KeycloakProvider({
      clientId: 'madeira',
      clientSecret: 'cNA21h0SHUumDdt7JJUiBMzKcQDn57qO',
      issuer: 'http://0.0.0.0:8080/realms/reino'
    })
  ],
  
})

  
/**
 * 
 * KeycloakProvider({
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_KEYCLOAK_SECRET,
      issuer: process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER,
      wellKnown: 'http://0.0.0.0:8080/realms/next/.well-known/openid-configuration'
    } as any)
 */