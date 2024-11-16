"use client";

import type { ReactNode } from "react";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@battle-stadium/ui";
import { useRouter } from "next/navigation";

interface ModalProps {
  children: ReactNode;
}

export default function Modal ({ children }: Readonly<ModalProps>) {
  const router = useRouter();
  return (
    <Dialog defaultOpen={ true } open={ true } onOpenChange={ () => router.back() }>
      <DialogOverlay>
        <DialogContent className="overflow-y-hidden">

          <DialogHeader>
            <DialogTitle>Register for Tournament</DialogTitle>
            <DialogDescription>
              Register for tournament
            </DialogDescription>
          </DialogHeader>
          { children }
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
