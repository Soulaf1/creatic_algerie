 import bcrypt from "bcryptjs";

const password ="MonMotDePasse123"; // <-- Remplace par TON mot de passe admin

const hash = await bcrypt.hash(password, 10);

console.log("Mot de passe :", password);
console.log("Hash :", hash);