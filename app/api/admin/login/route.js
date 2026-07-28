import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import connectDB from "@/lib/db";
import Admin from "@/models/Admin";
export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Tous les champs sont obligatoires.",
        },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Email ou mot de passe incorrect.",
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Email ou mot de passe incorrect.",
        },
        { status: 401 }
      );
    }

    // Le JWT viendra juste après

   const token = jwt.sign(
  {
    id: admin._id.toString(),
    email: admin.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

const response = NextResponse.json({
  success: true,
  message: "Connexion réussie.",
});

response.cookies.set("admin_token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 jours
});

return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}