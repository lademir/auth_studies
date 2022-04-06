import NextAuth, { Profile } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { addRoles } from "../../../utils/keycloak";



export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		KeycloakProvider({
			clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_KEYCLOAK_SECRET,
			issuer: process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER,
      idToken: true,
      accessTokenUrl: "http://0.0.0.0:8080/realms/nextauth/protocol/openid-connect/token"
		} as any),
	],
  session: {
    strategy: "jwt"
  },
	callbacks: {
		jwt: async ({ token, user, account, profile }) => {
      // console.log('JWT callback \n')
			if(account?.access_token){
        // console.log('access token',account)
        
        token.roles = await addRoles(account)
      }
      return Promise.resolve(token);
		},
    session: async ({ session, token, user }) => {
      // console.log('Session callback \n')
      // console.log('Session',session)
      // console.log('Token',token);
      
      
      session.user = token;
      
      return Promise.resolve(session)
    }
	},
});


