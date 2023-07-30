import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { announcements } from "@prisma/client";

// API to find all the critical announcements of company
// method : GET
// params : id (required)
// params : start (optional), end (optional)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

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
      console.log({ start, end });
      announcements = await prismadb.announcements.findMany({
        where: {
          NEWS_DT: {
            gte: new Date(start.replace(" ", "+")).toISOString(),
            lte: new Date(end.replace(" ", "+")).toISOString(),
          },
          CRITICALNEWS: 1,
        },
      });
    } else {
      announcements = await prismadb.announcements.findMany({
        where: {
          CRITICALNEWS: 1,
        },
      });
    }

    if (announcements === null || announcements.length === 0) {
      return NextResponse.json({ msg: "No announcement found" });
    }

    return NextResponse.json({ msg: "successful", data: announcements });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}


// API to find all the critical announcements of a list of companies over a given period.
// method : POST
// body : list of company ids
// params : start (optional), end (optional)
export async function POST(request: Request) {
  try {
    const { ids } = await request.json();
    const { searchParams } = new URL(request.url);

    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (ids === undefined || ids === null || ids.length === 0) {
      return new NextResponse("Id missing", { status: 400 });
    }

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
