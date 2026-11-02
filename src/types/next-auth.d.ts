import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: "CUSTOMER" | "ADMIN";
  }
  interface Session {
    user: DefaultSession["user"] & { id: string; role: "CUSTOMER" | "ADMIN" };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "CUSTOMER" | "ADMIN";
  }
}
