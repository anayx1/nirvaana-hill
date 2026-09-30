import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VisitConfirmationModal from "@/components/modals/VisitConfirmationModal";
import FloatingWhatsAppButton from "@/components/common/FloatingWhatsAppButton";
import Script from "next/script";

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  "6LfX-swtAAAAABC33yvdKrAOKKr72WSiivsJBOfI";

export const metadata = {
  title: "Nirvaana Hill",
  description: "Nirvaana Hill",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <VisitConfirmationModal />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
