import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Temoignage from "@/models/Temoignage";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function PUT(request, { params }) {
  try {
    await verifyAdmin(request);
    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    const temoignage = await Temoignage.findByIdAndUpdate(
      id,
      {
        nom: body.nom,
        entreprise: body.entreprise,
        citation: body.citation,
        etoiles: Number(body.etoiles),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!temoignage) {
      return NextResponse.json(
        { error: "Témoignage introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json(temoignage);
  } catch (error) {
    console.error("ERREUR PUT ADMIN TEMOIGNAGES:", error);

    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de la modification." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await verifyAdmin(request);
    await dbConnect();

    const { id } = await params;

    const temoignage = await Temoignage.findByIdAndDelete(id);

    if (!temoignage) {
      return NextResponse.json(
        { error: "Témoignage introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Témoignage supprimé avec succès.",
    });
  } catch (error) {
    console.error("ERREUR DELETE ADMIN TEMOIGNAGES:", error);

    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de la suppression." },
      { status: 500 }
    );
  }
}