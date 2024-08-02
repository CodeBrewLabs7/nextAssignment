import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
// to check if  it user is trying to go through the /dashboard page
export default async function Page() {
  const authSession = await getServerAuthSession();

  if(!authSession?.user){
    redirect('/')
  }
  
    return <h1>Hello, Dashboard Page!</h1>
  }