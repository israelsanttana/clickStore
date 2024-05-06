/* eslint-disable @typescript-eslint/no-unused-vars */
import { app } from "@/server/firebaseConfig";
import { GoogleAuthProvider, User, getAuth, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface AuthContextType {
    signInGoogle: () => void;
    signed: boolean;
    user: User | null; // Se desejar acessar o usuário em outros componentes
    signOut: () => JSX.Element;

}
const provider = new GoogleAuthProvider();
export const AuthGoogleContext = createContext<AuthContextType>({
    signInGoogle: () => { }, // Defina funções padrão vazias ou valores padrão apropriados
    signed: false,
    user: null,
    signOut: () => <Navigate to="/" />,
});
export const AuthGoogleProvider = ({ children }: { children: React.ReactNode }) => {

    const auth = getAuth(app);
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const loadStoteAuth = () => {
            const token = sessionStorage.getItem("@AuthFirebase:token");
            const user = sessionStorage.getItem("@AuthFirebase:user");
            if (token && user) {
                setUser(JSON.parse(user));
            }
        };
        loadStoteAuth();
    }, [])

    const signInGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (credential) {
                    const token = credential.accessToken || "";
                    const user = result.user;
                    setUser(user);
                    sessionStorage.setItem("@AuthFirebase:token", token);
                    sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
                } else {
                    console.log("Credential is null");
                }
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };

    function signOut() {
        sessionStorage.removeItem("@AuthFirebase:token");
        sessionStorage.removeItem("@AuthFirebase:user");
        setUser(null);
        return <Navigate to="/" />

    }

    return (
        <AuthGoogleContext.Provider value={{
            signInGoogle,
            signed: !!user,
            user,
            signOut,
        }}>
            {children}
        </AuthGoogleContext.Provider>
    )
}