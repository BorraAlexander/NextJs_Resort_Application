"use server";

import { auth } from "../auth";
import DBConnection from "../utils/config/db";
import BookingModel from "../utils/models/Bookings";
import UserModel from "../utils/models/User";

export async function bookingAction(bookingDetails) {
  await DBConnection();

  const session = await auth();
  
  try {
    const user = await UserModel.findOne({ email: session.email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const userId = user._id.toString();

    const userBookingDetails = await BookingModel.create({
      startDate: bookingDetails.selectedDates.startDate,
      endDate: bookingDetails.selectedDates.endDate,
      productName: bookingDetails.record.title,
      price: bookingDetails.record.price,
      offer: bookingDetails.record.offer,
      image: bookingDetails.record.image,
    });

    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { bookings: userBookingDetails._id } },

      { new: true },
    );

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
