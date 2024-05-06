import { Button } from "@/components/ui/button";

import { Products } from "@/interface/types";
import { fetchData } from "@/server/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export function Home() {

    const [products, setProducts] = useState<Products>([]);

    useEffect(() => {
        const getProducts = async () => {
            const result = await fetchData();
            setProducts(result);
        }
        getProducts();
    }, []);

    return (
        <div>
            <Button variant="default" className="m-4">
                <Link to="/login">Login</Link>
            </Button>

            {products.map((product) => (
                <div key={product.id}>
                    {product.title}
                </div>
            ))}
        </div>
    )
}