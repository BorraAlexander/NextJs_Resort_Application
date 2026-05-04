import { auth } from "@/app/auth";
import ProductDetail from "@/app/components/ProductDetail";
import UserNavigation from "@/app/components/UserNavigation";
import React from "react";

const page = async () => {
  const session = await auth();
  const userName = session.username;
  return (
    <div>
      <UserNavigation userName={userName} />
      <ProductDetail />
    </div>
  );
};

export default page;
