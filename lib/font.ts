import { Gochi_Hand, Pacifico, Roboto } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const gochiHand = Gochi_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gochi-hand",
});

export const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});
