import { withAuth } from "next-auth/middleware"
import { isAdmin } from "../../../utils/keycloak"

// Apesar do nome signIn, como aqui é um nivel de acesso, quando o callback retorna falso, redireciona para a pagina signIn

export default withAuth({
    pages: {
        signIn: '/app'
    },
    callbacks: {
        authorized: ({token}) => isAdmin(token),

    },
})