import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const authSession = await getServerAuthSession();
 
  if (!authSession?.user) {
    // Redirect to login page if not authenticated
    redirect('/login');
  }

  // Redirect to /dashboard/projects if authenticated
  redirect('/dashboard/projects');

  return (  
  <main className="flex items-center justify-center h-screen">
    <p>Home Page</p>
  </main>
  );
}