import { useKeycloak } from "@react-keycloak/ssr";
import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { KEYCLOAK_CONFIG } from "../utils/auth";



const LoginPage: NextPage = () => {

    const { data: session } = useSession()
    
    console.log(session?.user)
    function handleLogout() {
        signOut();
    }
    if (session) {


        return (
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 flex flex-col">
                    {JSON.stringify(session.user)}
                    <button onClick={handleLogout} className="bg-gray-400 p-5 rounded-md">LOGOUT</button>
                </div>
            </div>
        )
    }
    function handleLogin() {
        signIn('keycloak')
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 flex flex-col">
                <button onClick={handleLogin} className="bg-gray-400 p-5 rounded-md">Login</button>
            </div>
        </div>
    )
}

export default LoginPage;