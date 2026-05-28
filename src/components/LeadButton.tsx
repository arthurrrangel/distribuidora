"use client";
import { useState, ReactNode } from "react";
import { LeadMagnetModal } from "@/components/LeadMagnetModal";

export function LeadButton({ children, className, source = "tabela" }: { children: ReactNode; className?: string; source?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <LeadMagnetModal open={open} onClose={() => setOpen(false)} source={source} />
    </>
  );
}
