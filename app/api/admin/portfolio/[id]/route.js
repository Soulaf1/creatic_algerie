import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import { verifyAdmin } from "@/lib/verifyAdmin";
import cloudinary from "@/lib/cloudinary";

export async function PUT(request, { params }) {
  try {
    await verifyAdmin(request);
    await dbConnect();

    const { id } = await params;
    const formData = await request.formData();

    const titre = formData.get("titre");
    const categorie = formData.get("categorie");
    const problematique = formData.get("problematique");
    const solution = formData.get("solution");
    const resultat = formData.get("resultat");
    const file = formData.get("image");

    const updateData = {
      titre,
      categorie,
      problematique,
      solution,
      resultat,
    };

    // Si une nouvelle image a été envoyée
    if (file && typeof file !== "string" && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload nouvelle image sur Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "creatic-algerie/portfolio" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      updateData.image = uploadResult.secure_url;

      // Supprime l'ancienne image de Cloudinary
      const ancien = await Portfolio.findById(id);
      if (ancien?.image && ancien.image.includes('cloudinary')) {
        const publicId = ancien.image.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId).catch(() => {});
      }
    }

    const projet = await Portfolio.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!projet) {
      return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });
    }

    return NextResponse.json(projet);
  } catch (error) {
    console.error("ERREUR PUT ADMIN PORTFOLIO:", error);

    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
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

    const projet = await Portfolio.findById(id);

    if (!projet) {
      return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });
    }

    // Supprime l'image de Cloudinary
    if (projet.image && projet.image.includes('cloudinary')) {
      const publicId = projet.image.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(publicId).catch(() => {});
    }

    await Portfolio.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Projet supprimé avec succès.",
    });
  } catch (error) {
    console.error("ERREUR DELETE ADMIN PORTFOLIO:", error);

    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Erreur lors de la suppression." },
      { status: 500 }
    );
  }
}