import { type PropsWithChildren } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { BackToTop } from "@/components/ui/BackToTop";

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ScrollToTop />
      <Header />
      <BackToTop />
      <main id="contenido-principal" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};
