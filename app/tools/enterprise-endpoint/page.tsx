import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata = { robots: { index: false, follow: false } };
export default function LegacyToolkitPage() { redirect("/development/enterprise-endpoint"); }
