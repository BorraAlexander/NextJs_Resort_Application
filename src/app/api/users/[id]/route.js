import DBConnection from "@/app/utils/config/db";
import UserModel from "@/app/utils/models/User";
import { NextResponse } from "next/server";
import BookingModel from "@/app/utils/models/Bookings";
// GET - single user
export async function GET(request, context) {
  await DBConnection();

  const { id } = await context.params;

  try {
    if (!id) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }
    const user = await UserModel.findById(id).populate("bookings");
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// DELETE - single user
export async function DELETE(request, context) {
  await DBConnection();

  const { id } = await context.params;

  try {
    if (!id) {
      return NextResponse.json({ success: false, message: "ID is missing" });
    }

    const booking = await BookingModel.findByIdAndDelete(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
