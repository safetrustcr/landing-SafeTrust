"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/modal";
import { NewsletterForm } from "./NewsletterForm";

const MODAL_DELAY_MS = 30000;

interface NewsletterModalProps {
  delay?: number;
}

export function NewsletterModal({ delay = MODAL_DELAY_MS }: NewsletterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasShown) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasShown(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, hasShown]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Stay Updated"
      size="md"
      showCloseButton={true}
      closeOnOverlayClick={true}
    >
      <div className="p-6">
        <p className="text-muted-foreground mb-6">
          Get exclusive updates, security tips, and product news delivered to your inbox.
        </p>
        <NewsletterForm
          variant="default"
          onSuccess={() => setTimeout(() => setIsOpen(false), 2000)}
        />
      </div>
    </Modal>
  );
}
