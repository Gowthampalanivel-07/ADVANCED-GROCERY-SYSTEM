import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { SmoothScrollProvider } from "@/contexts/ScrollContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Advanced Grocery System - AI-Powered Store Management",
  description:
    "The Store That Thinks — AI-powered grocery management system with dynamic pricing, smart inventory, customer analytics, and 24 extreme features for modern supermarkets.",
  keywords: "grocery system, AI store management, dynamic pricing, inventory management, organic grocery",
  authors: [{ name: "Rootz Organics" }],
  openGraph: {
    title: "Advanced Grocery System - AI-Powered Store Management",
    description: "Premium AI-powered grocery management system",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-premium-gradient">
        {/* Loading Screen */}
        <div id="page-loader" className="page-loader" aria-hidden="true">
          <div className="loader-logo flex flex-col items-center gap-3">
            <svg
              className="w-14 h-14 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "#1E4D2B" }}
            >
              <path d="M17,8C8,8,4,16,4,16s4-2,9-5c-5,3-8,9-8,9S12,16,17,8z M12,2C12,2,3,6,3,12s9,10,9,10s9-4,9-10S12,2,12,2z" />
            </svg>
            <div className="flex flex-col items-center">
              <span
                className="text-2xl font-black tracking-tight leading-none"
                style={{ fontFamily: "var(--font-manrope), sans-serif", color: "#1E4D2B" }}
              >
                Rootz
              </span>
              <span
                className="text-[9px] font-semibold tracking-[0.3em] uppercase leading-none mt-0.5"
                style={{ color: "#E6A817" }}
              >
                Organics
              </span>
            </div>
          </div>
          <div className="loader-ring" />
        </div>

        {/* Custom Cursor (desktop only) */}
        <div id="cursor-dot" className="cursor-dot hidden md:block" aria-hidden="true" />
        <div id="cursor-ring" className="cursor-ring hidden md:block" aria-hidden="true" />

        <Navbar />

        <SmoothScrollProvider>
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
        </SmoothScrollProvider>

        {/* Global JS for loading screen + custom cursor */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Hide loader after page is ready
                window.addEventListener('load', function() {
                  var loader = document.getElementById('page-loader');
                  if (loader) {
                    setTimeout(function() {
                      loader.classList.add('hidden');
                    }, 400);
                  }
                });

                // Custom cursor tracking
                var dot = document.getElementById('cursor-dot');
                var ring = document.getElementById('cursor-ring');
                var mouseX = 0, mouseY = 0;
                var ringX = 0, ringY = 0;

                document.addEventListener('mousemove', function(e) {
                  mouseX = e.clientX;
                  mouseY = e.clientY;
                  if (dot) {
                    dot.style.left = mouseX + 'px';
                    dot.style.top = mouseY + 'px';
                  }
                });

                function animateRing() {
                  ringX += (mouseX - ringX) * 0.12;
                  ringY += (mouseY - ringY) * 0.12;
                  if (ring) {
                    ring.style.left = ringX + 'px';
                    ring.style.top = ringY + 'px';
                  }
                  requestAnimationFrame(animateRing);
                }
                animateRing();

                // Ring hover state on interactive elements
                document.addEventListener('mouseover', function(e) {
                  var el = e.target;
                  if (el && (el.tagName === 'BUTTON' || el.tagName === 'A' || el.closest('button') || el.closest('a'))) {
                    if (ring) ring.classList.add('hovering');
                    if (dot) { dot.style.width = '12px'; dot.style.height = '12px'; dot.style.background = '#E6A817'; }
                  }
                });

                document.addEventListener('mouseout', function(e) {
                  var el = e.target;
                  if (el && (el.tagName === 'BUTTON' || el.tagName === 'A' || el.closest('button') || el.closest('a'))) {
                    if (ring) ring.classList.remove('hovering');
                    if (dot) { dot.style.width = '8px'; dot.style.height = '8px'; dot.style.background = '#1E4D2B'; }
                  }
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
