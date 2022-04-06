import { withAuth } from "next-auth/middleware"
import { isAdmin } from "./permission"


export default withAuth({
    callbacks: {
        authorized: ({token, req}) => isAdmin(token, req),
    }
})