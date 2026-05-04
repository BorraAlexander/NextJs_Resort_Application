import DBConnection from "@/app/utils/config/db";
import UserModel from "@/app/utils/models/User";
import { NextResponse } from "next/server";
export async function GET() {
  await DBConnection();

  try {
      // for all users including admin
    // const users = await UserModel.find({}, { password: 0 });
     // for all users except admin
    const users = await UserModel.find(
      { role: { $ne: "admin" } },
      { password: 0 },
    );
    if (!users) {
      return NextResponse.json(
        { success: false, message: "Users not found" },
        { status: 404 },
      );
    } else {
      return NextResponse.json({ success: true, users }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
