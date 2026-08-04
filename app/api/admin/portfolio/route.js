import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import { verifyAdmin } from "@/lib/verifyAdmin";

import { mkdir, writeFile } from "fs/promises";
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

export async function GET(request) {
  try {
    await verifyAdmin(request);
    await dbConnect();

    const projets = await Portfolio.find({}).sort({
      createdAt: -1,
    });

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
      !categorie ||
      !image
    ) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires." },
        { status: 400 }
      );
    }

    const imagePath = await saveImage(image);

    const projet = await Portfolio.create({
      titre: String(titre),
      problematique: String(problematique),
      solution: String(solution),
      resultat: String(resultat),
      categorie: String(categorie),
      image: imagePath,
    });

    return NextResponse.json(projet, {
      status: 201,
    });
  } catch (error) {
    console.error("ERREUR POST ADMIN PORTFOLIO:", error);

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
          "Erreur lors de la création du projet.",
      },
      { status: 500 }
    );
  }
}