"use client";

import { Toaster } from "@/components/ui/sonner";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";

/* optional future */
import { ReactNode } from "react";

export default function Providers({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ReduxProvider store={store}>
      <Toaster
        richColors
        theme="light"
      />
      {children}
    </ReduxProvider>
  );
}