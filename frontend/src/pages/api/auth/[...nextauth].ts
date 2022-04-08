import NextAuth, { Profile } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { addRoles, addTokens, finishSession } from "../../../utils/keycloak";



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
    strategy: "jwt",
  },
	callbacks: {
		jwt: async ({ token, user, account, profile }) => {
      // console.log('JWT callback \n')
			if(account?.access_token){
        console.log('access token',account)
        
        token.roles = await addRoles(account)
        token.tokens = addTokens(account);
      }
      return Promise.resolve(token);
		},
    session: async ({ session, token, user }) => {
      session.user = token;
      
      return Promise.resolve(session)
    },
	},
  events: {
    signOut: ({session, token}) => {
      console.log('\n[EVENT SING OUT]')
      console.log(session)
      console.log('\n\n', token)
      console.log('Finalizando a sessao')
      
      if(typeof token.tokens === 'object') {
        const tokens: any = token.tokens
        const out = finishSession({access_token: tokens.access_token, refresh_token: tokens.refresh_token});
        console.log(out);
      }
    }
  },
  cookies: {

  }
});


