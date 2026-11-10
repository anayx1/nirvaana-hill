import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VisitConfirmationModal from "@/components/modals/VisitConfirmationModal";
import FloatingWhatsAppButton from "@/components/common/FloatingWhatsAppButton";

const SITE_URL = "https://www.nirvaanahills.com";

export const viewport = {
  themeColor: "#1F2922",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nirvaana Hills | 200-Acre Managed Farmland Community Near Delhi & Gurgaon",
    template: "%s | Nirvaana Hills",
  },
  description:
    "Discover Nirvaana Hills, a premier 200-acre managed farmland community nestled in the serene Aravalli foothills near Delhi & Gurgaon. Freehold farm plots, nature-first lifestyle, organic cultivation, and modern amenities.",
  applicationName: "Nirvaana Hills",
  authors: [{ name: "SEAD Realty", url: SITE_URL }],
  creator: "SEAD Realty",
  publisher: "SEAD Realty",
  keywords: [
    "Nirvaana Hills",
    "farmland near Delhi",
    "farmland near Gurgaon",
    "managed farmland Haryana",
    "Aravalli farmland plots",
    "farmland for sale near Delhi NCR",
    "SEAD Realty",
    "agricultural land investment",
    "luxury farmhouses Delhi NCR",
    "second home near Gurgaon",
    "organic farming community",
    "gated farmland community",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/logo-new.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/logo-new.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logo-new.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Nirvaana Hills",
    title: "Nirvaana Hills | 200-Acre Managed Farmland Community Near Delhi & Gurgaon",
    description:
      "Experience natural serenity and long-term ownership nestled in the Aravallis. Premium managed farmland plots 2 hours from Delhi and Gurgaon.",
    images: [
      {
        url: "/nirvaana-hills/hero.webp",
        width: 1200,
        height: 630,
        alt: "Nirvaana Hills Farmland Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirvaana Hills | 200-Acre Managed Farmland Community Near Delhi & Gurgaon",
    description:
      "Experience natural serenity and long-term ownership nestled in the Aravallis. Premium managed farmland plots 2 hours from Delhi and Gurgaon.",
    images: ["/nirvaana-hills/hero.webp"],
    creator: "@nirvaanahills",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
