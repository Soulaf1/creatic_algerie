import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET(request) {
  try {
    await verifyAdmin(request);
    await dbConnect();

    const projets = await Portfolio.find({}).sort({ createdAt: -1 });

    return NextResponse.json(projets);
  } catch (error) {
    console.error("ERREUR GET ADMIN PORTFOLIO:", error);

    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await verifyAdmin(request);
    await dbConnect();

    const body = await request.json();

    const projet = await Portfolio.create(body);

    return NextResponse.json(projet, { status: 201 });
  } catch (error) {
    console.error("ERREUR POST ADMIN PORTFOLIO:", error);

    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de la création du projet." },
      { status: 500 }
    );
  }
}