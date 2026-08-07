import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import { verifyAdmin } from "@/lib/verifyAdmin";
import cloudinary from "@/lib/cloudinary";

export async function GET(request) {
  try {
    await verifyAdmin(request);
    await dbConnect();

    const projets = await Portfolio.find({}).sort({ createdAt: -1 });

    return NextResponse.json(projets);
  } catch (error) {
    console.error("ERREUR GET ADMIN PORTFOLIO:", error);

    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await verifyAdmin(request);
    await dbConnect();

    const formData = await request.formData();

    const titre = formData.get("titre");
    const categorie = formData.get("categorie");
    const problematique = formData.get("problematique");
    const solution = formData.get("solution");
    const resultat = formData.get("resultat");
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "Une image est requise." },
        { status: 400 }
      );
    }

    // Upload vers Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "creatic-algerie/portfolio" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const projet = await Portfolio.create({
      titre,
      categorie,
      problematique,
      solution,
      resultat,
      image: uploadResult.secure_url,
    });

    return NextResponse.json(projet, { status: 201 });
  } catch (error) {
    console.error("ERREUR POST ADMIN PORTFOLIO:", error);

    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Erreur lors de la création du projet." },
      { status: 500 }
    );
  }
}