import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import dbConnect from "@/lib/db";
import Admin from "@/models/Admin";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(request) {
  try {
    const adminToken = await verifyAdmin(request);

    await dbConnect();

    const body = await request.json();

    const { currentPassword, newPassword, confirmPassword } = body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "Les nouveaux mots de passe ne correspondent pas." },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          error:
            "Le nouveau mot de passe doit contenir au moins 8 caractères.",
        },
        { status: 400 }
      );
    }

    // On récupère l'email depuis le token
    const email = adminToken.email;

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Administrateur introuvable." },
        { status: 404 }
      );
    }

    // Vérifier l'ancien mot de passe
    const passwordIsValid = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!passwordIsValid) {
      return NextResponse.json(
        { error: "L'ancien mot de passe est incorrect." },
        { status: 401 }
      );
    }

    // Empêcher de remettre exactement le même mot de passe
    const samePassword = await bcrypt.compare(
      newPassword,
      admin.password
    );

    if (samePassword) {
      return NextResponse.json(
        {
          error:
            "Le nouveau mot de passe doit être différent de l'ancien.",
        },
        { status: 400 }
      );
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    admin.password = hashedPassword;

    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Mot de passe modifié avec succès.",
    });
  } catch (error) {
    console.error("ERREUR CHANGE PASSWORD:", error);

    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}