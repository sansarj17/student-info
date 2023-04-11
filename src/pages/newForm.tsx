import { Inter } from "next/font/google";
import NewFormLayout from "@/containers/newForm/NewFormLayout";

const inter = Inter({ subsets: ["latin"] });

export default function NewForm() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-300">
      <NewFormLayout />
    </main>
  );
}
