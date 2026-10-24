import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Requirement from "../../../../models/WorkerRequirement.js";

export async function POST(request) {
    try {
        await connectDB();

        const data = await request.json();

        const requirement = await Requirement.create(data);

        return NextResponse.json(
            {
                success: true,
                message: "Requirement saved successfully",
                data: requirement,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving requirement:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to save requirement",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
  try {
    await connectDB();

    const requirements = await Requirement.find({});

    return Response.json(requirements);
  } catch (error) {
    console.error("Failed to fetch requirements:", error);

    return Response.json(
      { message: "Failed to fetch requirements" },
      { status: 500 }
    );
  }
}