import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Temoignage from "@/models/Temoignage";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET(request) {
  try {
    await verifyAdmin(request);
    await dbConnect();

    const temoignages = await Temoignage.find({})
      .sort({ createdAt: -1 });

    return NextResponse.json(temoignages);
  } catch (error) {
    console.error("ERREUR GET ADMIN TEMOIGNAGES:", error);

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

    const temoignage = await Temoignage.create({
      nom: body.nom,
      entreprise: body.entreprise,
      citation: body.citation,
      etoiles: Number(body.etoiles),
    });

    return NextResponse.json(temoignage, {
      status: 201,
    });
  } catch (error) {
    console.error("ERREUR POST ADMIN TEMOIGNAGES:", error);

    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de la création du témoignage." },
      { status: 500 }
    );
  }
}