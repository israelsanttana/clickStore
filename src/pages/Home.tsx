import { Products } from "@/interface/types";
import { fetchData } from "@/server/api";
import { useEffect, useState } from "react";
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
            {products.map((product) => (
                <div key={product.id}>
                    {product.title}
                </div>
            ))}
        </div>
    )
}