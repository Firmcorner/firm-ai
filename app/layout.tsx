import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ai.firmcorner.com"),
  title: {
    default:
      "Firm AI - AI-Powered Business Consultant | Grow Your Business with AI",
    template: "%s | Firm AI",
  },
  description:
    "Transform your business with Firm AI - an intelligent AI business consultant that provides expert advice, strategic planning, market analysis, and actionable insights to accelerate your business growth. Get 24/7 personalized consulting powered by advanced AI.",
  keywords: [
    "AI business consultant",
    "business growth AI",
    "AI consulting",
    "business advisor AI",
    "strategic planning AI",
    "business intelligence",
    "AI-powered consulting",
    "digital business consultant",
    "startup consultant AI",
    "business strategy AI",
    "market analysis AI",
    "business automation",
    "entrepreneurship AI",
    "SMB consulting",
    "business optimization",
  ],
  authors: [{ name: "Firm AI" }],
  creator: "Firm AI",
  publisher: "Firm AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai.firmcorner.com",
    title: "Firm AI - AI-Powered Business Consultant | Grow Your Business",
    description:
      "Get expert AI-powered business consulting 24/7. Strategic planning, market analysis, and actionable insights to scale your business faster.",
    siteName: "Firm AI",
    images: [
      {
        url: "/og-image.png", // Create a 1200x630px image
        width: 1200,
        height: 630,
        alt: "Firm AI - AI Business Consultant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Firm AI - AI-Powered Business Consultant",
    description:
      "Transform your business with 24/7 AI-powered consulting. Get strategic insights and expert advice instantly.",
    images: ["/twitter-image.png"], // Create a 1200x675px image
    creator: "@yourtwitter", // Replace with your Twitter handle
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
  icons: {
    icon: [
      {
        url: "/firmai.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/firmai.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/firmai.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://ai.firmcorner.com",
  },
  category: "Business & Technology",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional SEO tags */}
        <link rel="canonical" href="https://ai.firmcorner.com" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Firm AI",
              description:
                "AI-powered business consulting service providing strategic advice and growth solutions",
              url: "https://ai.firmcorner.com",
              logo: "https://ai.firmcorner.com/firmai.png",
              image: "https://ai.firmcorner.com/og-image.png",
              priceRange: "$$",
              serviceType: [
                "Business Consulting",
                "Strategic Planning",
                "AI Consulting",
                "Business Intelligence",
              ],
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: "Global",
                  longitude: "Service",
                },
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Business Consulting Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Business Consulting",
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* FAQ Schema (add your actual FAQs) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Firm AI?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Firm AI is an AI-powered business consultant that provides expert advice, strategic planning, and actionable insights to help businesses grow and succeed.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How can AI help my business?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "AI can analyze your business data, identify growth opportunities, provide strategic recommendations, automate processes, and offer 24/7 expert consulting to accelerate your business success.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
