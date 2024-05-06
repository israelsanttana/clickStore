import { AuthGoogleContext } from "@/contexts/AuthGoogle";
import { Dashboard } from "@/pages/Dashboard";
import { Home } from "@/pages/Home";
import { useContext } from "react";


export const PrivateRoutes = () => {

    const { signed } = useContext(AuthGoogleContext);
    return signed ? <Dashboard /> : <Home />


}