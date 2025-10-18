import { type PropsWithChildren } from "react";
import { DefaultLayout } from "@/layouts/DefaultLayout";

export const LandingLayout = ({ children }: PropsWithChildren) => {
  return (
    <DefaultLayout>
      <div className="bg-gradient-to-b from-white to-slate-100">{children}</div>
    </DefaultLayout>
  );
};
