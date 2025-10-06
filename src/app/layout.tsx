import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/Header/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

// Dynamically import the Fbpixel component with SSR disabled
// const Fbpixel = dynamic(import("../app/components/FaceBookPixel/Fbpixel"));
const Fbpixel = dynamic(
    () => import("../app/components/FaceBookPixel/Fbpixel"),
    {
        ssr: false, // Disable server-side rendering for this component
    }
);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ডাঃ সাইদুল ইসলাম",
    description: "",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NavBar></NavBar>
                <Fbpixel />
                {children}
                <ToastContainer />
            </body>
        </html>
    );
}
