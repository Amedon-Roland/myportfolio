"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { ui, type Lang } from "@/i18n";

export function CopyEmail({ email, lang }: { email: string; lang: Lang }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-5 font-medium transition-colors hover:border-muted"
      >
        {copied ? <Check aria-hidden className="h-4 w-4 text-leaf" /> : <Copy aria-hidden className="h-4 w-4" />}
        {copied ? ui.contact.copied[lang] : ui.contact.copy[lang]}
      </button>
      <span role="status" className="sr-only">
        {copied ? ui.contact.copied[lang] : ""}
      </span>
    </>
  );
}
