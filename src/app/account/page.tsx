// /account — logged-in customers only. Addresses and order history arrive in weeks 8–10.
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/account");

  return (
    <div className="flex max-w-xl flex-col gap-4">
      <h1 className="font-serif text-3xl font-bold">My account</h1>
      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-xl bg-cream p-5">
        <dt className="text-muted">Name</dt>
        <dd className="font-medium">{session.user.name}</dd>
        <dt className="text-muted">Email</dt>
        <dd className="font-medium">{session.user.email}</dd>
        <dt className="text-muted">Role</dt>
        <dd className="font-medium">{session.user.role === "ADMIN" ? "Administrator" : "Customer"}</dd>
      </dl>
      <p className="text-sm text-muted">Delivery addresses (A4) and order history (A8) will appear here.</p>
    </div>
  );
}
