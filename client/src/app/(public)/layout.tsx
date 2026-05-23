
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}