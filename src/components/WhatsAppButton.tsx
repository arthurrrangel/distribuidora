"use client";

export function WhatsAppButton() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "21995946491";
  const message = encodeURIComponent(
    "Olá! Vim pelo site da Repon e queria saber mais sobre os produtos.",
  );
  const href = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200"
    >
      {/* WhatsApp SVG icon */}
      <svg
        viewBox="0 0 32 32"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
      >
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.482.672 4.808 1.845 6.805L2 30l7.418-1.82A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.83-1.598l-.418-.248-4.4 1.08 1.115-4.274-.272-.44A11.5 11.5 0 1116 27.5zm6.32-8.612c-.347-.174-2.054-1.014-2.373-1.13-.32-.116-.553-.174-.786.174-.232.347-.9 1.13-1.103 1.362-.203.232-.406.26-.753.087-.347-.174-1.466-.54-2.793-1.722-1.032-.92-1.728-2.056-1.93-2.403-.204-.347-.022-.534.152-.707.157-.155.347-.406.52-.609.174-.203.232-.347.347-.579.116-.232.058-.434-.029-.608-.087-.174-.786-1.894-1.077-2.594-.283-.68-.57-.587-.786-.598l-.669-.012c-.232 0-.608.087-.927.434-.319.347-1.218 1.19-1.218 2.9s1.247 3.365 1.42 3.597c.174.232 2.452 3.746 5.943 5.253.83.358 1.479.572 1.984.732.833.265 1.591.228 2.19.138.668-.1 2.054-.84 2.345-1.652.29-.811.29-1.507.203-1.652-.087-.145-.319-.232-.667-.406z" />
      </svg>
    </a>
  );
}
