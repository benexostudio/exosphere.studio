import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exosphere Studio",
  description: "Creative technology studio — AI installations, music, and automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}