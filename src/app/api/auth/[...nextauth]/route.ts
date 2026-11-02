// POST/GET /api/auth/* — login, logout and session endpoints handled by Auth.js (A4)
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
