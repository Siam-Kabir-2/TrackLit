import { Geist, Geist_Mono , Inter,Ubuntu} from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const inter = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const ubuntu= Ubuntu({
  weight:["400","500","700"],
  variable:"--font-ubuntu",
  subsets:["latin"]
})
