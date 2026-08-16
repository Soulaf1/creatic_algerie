import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log("MONGODB_URI présente :", !!process.env.MONGODB_URI);

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI introuvable dans .env.local");
  process.exit(1);
}

console.log("Connexion à MongoDB...");

try {
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log("✅ CONNEXION MONGODB RÉUSSIE");

  await mongoose.disconnect();
} catch (error) {
  console.error("❌ ERREUR MONGODB :", error);
}