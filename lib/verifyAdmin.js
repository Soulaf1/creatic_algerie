import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Admin from "@/models/Admin";

export async function verifyAdmin(request) {
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  await connectDB();

  const admin = await Admin.findById(decoded.id);

  if (!admin) {
    throw new Error("UNAUTHORIZED");
  }

  return admin;
}