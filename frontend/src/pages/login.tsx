import { useKeycloak } from "@react-keycloak/ssr";
import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { KEYCLOAK_CONFIG } from "../utils/auth";



const LoginPage: NextPage = () => {

    const { data, status } = useSession();

    function handleLogin() {
        signIn('keycloak', { callbackUrl: '/app' })
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 flex flex-col">
                <button onClick={handleLogin} className="bg-gray-400 p-5 rounded-md">Login</button>
                <span>
                    {JSON.stringify({ ...data?.user, status })}
                </span>
                <button type="button">
                    <a href="/app">Ir para privado</a>
                </button>
            </div>
        </div>
    )
}

export default LoginPage;