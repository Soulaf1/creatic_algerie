import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import prompts from "prompts";
import bcrypt from "bcryptjs";

const { default: connectDB } = await import("./lib/db.js");
const { default: Admin } = await import("./models/Admin.js");

await connectDB();

const response = await prompts([
  {
    type: "text",
    name: "email",
    message: "Email de l'administrateur :",
    validate: (value) =>
      value.includes("@") ? true : "Veuillez entrer un email valide.",
  },
  {
    type: "password",
    name: "password",
    message: "Mot de passe :",
    validate: (value) =>
      value.length >= 8
        ? true
        : "Le mot de passe doit contenir au moins 8 caractères.",
  },
]);

const { email, password } = response;

const existingAdmin = await Admin.findOne({
  email: email.toLowerCase(),
});

if (existingAdmin) {
  console.log("❌ Un administrateur avec cet email existe déjà.");
  process.exit();
}

const hashedPassword = await bcrypt.hash(password, 10);

await Admin.create({
  email: email.toLowerCase(),
  password: hashedPassword,
});

console.log("\n✅ Administrateur créé avec succès !");
console.log("Email :", email);

process.exit();