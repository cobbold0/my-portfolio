import { Manrope, Playfair_Display } from "next/font/google";

export const sansFont = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});
