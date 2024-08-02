import ProductTable from "@/components/Table/CustomTable";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  // server side data fetching child component will treat the upcoming data as 
  // the static data for the better seo purpose
  const response = await fetch("https://dummyjson.com/products?limit=4");
  const data = await response.json();
  const authSession = await getServerAuthSession();

  if(!authSession?.user){
    redirect('/')
  }
  

  return (
    <div>
     
      <ProductTable initialItems={data?.products} initialTotalCount={data?.total}  />
    </div>
  );
};

export default Page;
