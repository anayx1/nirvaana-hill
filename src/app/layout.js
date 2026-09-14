import "./globals.css";

export const metadata = {
  title: "Nirvaana Hill",
  description: "Nirvaana Hill",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
