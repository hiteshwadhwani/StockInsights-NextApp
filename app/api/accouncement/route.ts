import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import { announcements } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const { ids } = await request.json();
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
