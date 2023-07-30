import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


// API to retrieve announcements from the past 1-2 days in descending time order.
// method : GET
export async function GET() {
  try {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 2);
    const announcements = await prismadb.announcements.findMany({
      where: {
        NEWS_DT: {
          gte: currentDate.toISOString(),
        },
      },
      orderBy: {
        NEWS_DT: 'desc'
      }
    });

    if (announcements.length === 0) {
      return NextResponse.json({ msg: "No announcement found" });
    }
    const data = announcements.map((item) => ({
      ...item,
      NEWS_DT: item.NEWS_DT.toISOString(),
    }));

    return NextResponse.json({ msg: "successful", data: data });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
