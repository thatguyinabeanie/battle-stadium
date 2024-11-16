"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@battle-stadium/ui";

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: Readonly<ModalProps>) {
  const router = useRouter();
  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={() => router.back()}>
      <DialogContent className="overflow-y-hidden">
        <DialogHeader>
          <DialogTitle>Register for Tournament</DialogTitle>
          <DialogDescription>Register for tournament</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
