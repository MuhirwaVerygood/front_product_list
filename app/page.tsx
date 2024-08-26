import Image from "next/image";
import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col py-[2%] pl-[5%] bg-pink-50">
     <ProductList />
    </main>
  );
}
