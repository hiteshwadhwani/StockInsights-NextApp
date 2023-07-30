import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { announcements } from "@prisma/client";

// API to find announcements of a multiple companies.
// body : list of company ids
// params : start (optional), end (optional)
export async function POST(request: Request) {
  try {
    const { ids } = await request.json();
    const { searchParams } = new URL(request.url);

    if (ids === undefined || ids === null || ids.length === 0) {
      return new NextResponse("Id missing", { status: 400 });
    }

    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (!start && end) {
      return new NextResponse("start field missing", { status: 400 });
    }
    if (start && !end) {
      return new NextResponse("end field missing", { status: 400 });
    }

    let announcements: announcements[] = [];
    if (start && end) {
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const data = await prismadb.announcements.findMany({
          where: {
            SCRIP_CD: parseInt(id),
            NEWS_DT: {
              gte: new Date(start.replace(" ", "+")).toISOString(),
              lte: new Date(end.replace(" ", "+")).toISOString(),
            },
          },
        });
        announcements = [...announcements, ...data];
      }
    } else {
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const data = await prismadb.announcements.findMany({
          where: {
            SCRIP_CD: parseInt(id),
          },
        });
        announcements = [...announcements, ...data];
      }
    }

    console.log(announcements);
    if (announcements.length === 0 || announcements === null) {
      return NextResponse.json({ msg: "No announcement found" });
    }

    return NextResponse.json({ msg: "successful", data: announcements });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
