import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getToken } from "next-auth/jwt";
import { getCsrfToken, getProviders, getSession, signOut, useSession } from "next-auth/react";
import { parseCookies } from "nookies";


const Dashboard: NextPage = () => {

    const session = useSession();
    // console.log('[Client]', session);


    async function handleLogout() {
        signOut({ redirect: true });

    }

    return (
        <div className="w-screen h-screen bg-slate-200">
            <div className="flex justify-center items-center flex-col">
                Voce esta logado
                <button onClick={handleLogout} className="bg-gray-400 p-5 rounded-md">LOGOUT</button>
                <div className="w-8/12">
                    <p className="flex-wrap flex">
                        {JSON.stringify({ session })}
                    </p>
                </div>
                <a href="/app/admin">
                    <button>
                        Ir para pagina adm
                    </button>
                </a>
            </div>
        </div>
    )
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

    // const backSession = await getSession(ctx);
    // console.log('[Server]', backSession);

    // const token = await getToken(ctx);
    // console.log('[Server token]', token)

    return {
        props: {

        }
    }
}