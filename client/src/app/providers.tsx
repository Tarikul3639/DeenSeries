"use client";

import { Toaster } from "@/components/ui/sonner";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ReactNode } from "react";

export default function Providers({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider>
      <ReduxProvider store={store}>
        <Toaster richColors />
        {children}
      </ReduxProvider>
    </ThemeProvider>
  );
}
