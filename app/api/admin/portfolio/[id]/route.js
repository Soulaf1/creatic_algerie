import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import { verifyAdmin } from "@/lib/verifyAdmin";

import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

async function saveImage(file) {
  if (!file || typeof file.arrayBuffer !== "function") {
    return null;
  }

  if (!ALLOWED_TYPES[file.type]) {
    throw new Error(
      "Format d'image non autorisé. Utilisez JPG, PNG, WEBP ou GIF."
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("L'image ne doit pas dépasser 5 Mo.");
  }

  const extension = ALLOWED_TYPES[file.type];
  const fileName = `${randomUUID()}.${extension}`;

  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "portfolio"
  );

  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, fileName);
  const bytes = Buffer.from(await file.arrayBuffer());

  await writeFile(filePath, bytes);

  return `/uploads/portfolio/${fileName}`;
}

async function deleteImage(imagePath) {
  if (!imagePath || !imagePath.startsWith("/uploads/portfolio/")) {
    return;
  }

  const filePath = path.join(
    process.cwd(),
    "public",
    imagePath.replace(/^\/+/, "")
  );

  try {
    await unlink(filePath);
  } catch {
    // Le fichier peut déjà ne plus exister.
  }
}

export async function PUT(request, { params }) {
  try {
    await verifyAdmin(request);
    await dbConnect();

    const { id } = await params;

    const projet = await Portfolio.findById(id);

    if (!projet) {
      return NextResponse.json(
        { error: "Projet introuvable." },
        { status: 404 }
      );
    }

    const formData = await request.formData();

    const titre = formData.get("titre");
    const problematique = formData.get("problematique");
    const solution = formData.get("solution");
    const resultat = formData.get("resultat");
    const categorie = formData.get("categorie");
    const image = formData.get("image");

    if (
      !titre ||
      !problematique ||
      !solution ||
      !resultat ||
      !categorie
    ) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires." },
        { status: 400 }
      );
    }

    let imagePath = projet.image;

    // Une nouvelle image a été sélectionnée
    if (
      image &&
      typeof image.arrayBuffer === "function" &&
      image.size > 0
    ) {
      const newImagePath = await saveImage(image);

      await deleteImage(projet.image);

      imagePath = newImagePath;
    }

    projet.titre = String(titre);
    projet.problematique = String(problematique);
    projet.solution = String(solution);
    projet.resultat = String(resultat);
    projet.categorie = String(categorie);
    projet.image = imagePath;

    await projet.save();

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
      {
        error:
          error.message ||
          "Erreur lors de la modification.",
      },
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
      return NextResponse.json(
        { error: "Projet introuvable." },
        { status: 404 }
      );
    }

    await deleteImage(projet.image);
    await Portfolio.findByIdAndDelete(id);

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