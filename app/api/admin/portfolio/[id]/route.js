import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function PUT(request, { params }) {
  try {
    await verifyAdmin(request);
    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    const projet = await Portfolio.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!projet) {
      return NextResponse.json(
        { error: "Projet introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json(projet);
  } catch (error) {
    console.error("ERREUR PUT ADMIN PORTFOLIO:", error);

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

    const projet = await Portfolio.findByIdAndDelete(id);

    if (!projet) {
      return NextResponse.json(
        { error: "Projet introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Projet supprimé avec succès.",
    });
  } catch (error) {
    console.error("ERREUR DELETE ADMIN PORTFOLIO:", error);

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