import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { data } from "autoprefixer";

interface Iparams {
  id?: string;
}

export async function GET(request: Request, { params }: { params: Iparams }) {
  try {
    const { id } = params;

    if (!id) {
      return new NextResponse("Id field missing", { status: 400 });
    }

    const { searchParams } = new URL(request.url);

    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (!start && end) {
      return new NextResponse("start field missing", { status: 400 });
    }
    if (start && !end) {
      return new NextResponse("end field missing", { status: 400 });
    }

    let announcements = null
    if (start && end) {
      console.log({start, end})
      announcements = await prismadb.announcements.findMany({
        where: {
          SCRIP_CD: parseInt(id),
          NEWS_DT: {
            gte: new Date(start.replace(" ", "+")).toISOString(),
            lte: new Date(end.replace(" ", "+")).toISOString()
          },
        },
      });
    } else {
      announcements = await prismadb.announcements.findMany({
        where: {
          SCRIP_CD: parseInt(id),
        },
      });
    }

    if (announcements.length === 0 || announcements === null) {
      return NextResponse.json({ msg: "No announcement found" });
    }
    const data = announcements.map((item) => ({
      ...item, NEWS_DT: item.NEWS_DT.toISOString()
    }))

    return NextResponse.json({ msg: "successful", data: data });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
