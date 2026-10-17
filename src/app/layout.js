import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VisitConfirmationModal from "@/components/modals/VisitConfirmationModal";
import FloatingWhatsAppButton from "@/components/common/FloatingWhatsAppButton";

export const metadata = {
  title: "Nirvaana Hill",
  description: "Nirvaana Hill",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <VisitConfirmationModal />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
