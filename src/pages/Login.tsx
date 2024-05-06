import { Button } from "@/components/ui/button";
import { AuthGoogleContext } from "@/contexts/AuthGoogle";
import { User } from "@phosphor-icons/react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import logoGoogle from "../assets/logo-Google.png";

export function Login() {
    const { signInGoogle, signed } = useContext(AuthGoogleContext);

    function loginGoogle() {
        signInGoogle();
    }

    // Se o usuário estiver autenticado, redirecione para a página de dashboard
    if (signed) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="container h-screen flex justify-center items-center">
            <div className="w-[300px]">
                <div className="border-solid shadow rounded-md flex flex-col justify-center items-center gap-3 p-4">
                    <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-slate-300">
                        <User size={32} />
                    </div>
                    <div>
                        <h2>Olá, visitante!</h2>
                    </div>
                </div>

                <Button
                    variant="default"
                    className="w-full mt-4 flex justify-between items-center gap-2"
                    onClick={loginGoogle}
                >
                    <img src={logoGoogle} width={20} />
                    Logar com uma conta Google
                </Button>
            </div>
        </div>
    );
}
