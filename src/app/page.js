import React from "react";
import DBConnection from "./utils/config/db";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import UserNavigation from "./components/UserNavigation";
import AdminPage from "./admin/page";
import ProductCollection from "./components/ProductCollection";


const HomePage = async () => {
  await DBConnection();

  const session = await auth();

  // console.log("session:", session);
  await DBConnection();

  if (!session) {
    redirect("/login");
  }

  const userName = session.username;
  console.log("userName:", userName);
  console.log("role:", session.role);

  return (
    <div>
      {session.role === "user" && (
        <>
          <UserNavigation userName={userName} />
          <img src="/banner.jpg" alt="Banner"  className="bannerImage"/>
          <ProductCollection/>
        </>
      )}

      {session.role === "admin" && <AdminPage />}
    </div>
  );
};

export default HomePage;
