import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";

const AdminPage: NextPage = () => {

    const { data: session } = useSession()

    return (
        <div className=" flex-col h-screen w-screen bg-slate-700 text-white flex justify-center items-center">
            <p>
                Voce esta na pagina de adm
            </p>
            <p>
                {JSON.stringify(session?.user)}
            </p>
        </div>
    )
}

export default AdminPage;

// export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {


//     const token = await getToken(ctx);

//     if(token){
//         console.log("JSON Web Token", JSON.stringify(token, null, 2))
//     }

//     return {
//         props: {

//         }
//     }
// }