"use server";

import { signIn } from "../auth"
import DBConnection from "../utils/config/db";


export async function loginAction(loginDetails) {
  await DBConnection();

  try {
    await signIn("credentials", {
      email: loginDetails.email,
      password: loginDetails.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
