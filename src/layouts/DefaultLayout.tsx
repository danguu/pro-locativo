import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";

interface DefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header />
    <main id="main-content" className="flex-1">
      {children}
    </main>
    <Footer />
    <BackToTop />
  </div>
);

export default DefaultLayout;
