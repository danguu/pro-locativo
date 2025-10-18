import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";

interface LandingLayoutProps {
  children: ReactNode;
}

export const LandingLayout = ({ children }: LandingLayoutProps) => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header />
    <main id="main-content" className="flex-1">
      {children}
    </main>
    <Footer />
    <BackToTop />
  </div>
);

export default LandingLayout;
