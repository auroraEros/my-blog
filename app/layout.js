// import vazirFont from "@/app/_consts/fonts";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";
import "./_styles/globals.css";
import AuthProvider from "./_context/AuthContext";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { DarkModeProvider } from "./_context/DarkModeContext";

const vazirFont = localFont({
  src: [
    {
      path: "../public/fonts/vazir/Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/vazir/Vazirmatn-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/vazir/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/vazir/Vazirmatn-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/vazir/Vazirmatn-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-vazir",
  style: "normal",
  display: "block",
});

export const metadata = {
  title: {
    template: "%s | بلااگ اپ",
    default: "بلاگ اپ",
  },
  description: "وب اپلیکیشن مدیریت بلاگ ها و نظرات کاربران",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirFont.variable} font-sans min-h-screen`}>
        <DarkModeProvider>
          <ReactQueryProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </ReactQueryProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
