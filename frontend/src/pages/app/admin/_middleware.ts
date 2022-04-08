import { withAuth } from "next-auth/middleware"
import { isAdmin } from "./permission"



export default withAuth({
    pages:{
        error: '/app',
        signIn: '/app',
        
    },
    callbacks: {
        authorized: ({token, req}) => isAdmin(token, req),

    }
})