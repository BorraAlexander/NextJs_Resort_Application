import DBConnection from "@/app/utils/config/db";
import ProductModel from "@/app/utils/models/Product";

import { NextResponse } from "next/server";

export async function GET(request, context) {
  await DBConnection();

  const { id } = await context.params;

  try {
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID Is missing" , status: 404 },
      );
    }

    const product = await ProductModel.findById(id);

     return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
