"use client";
import { useEffect, useRef, useState } from "react";

const FRAMES = [
  {
    code: "01",
    title: "Cadastro PJ aprovado.",
    body: "Lojista manda CNPJ pelo WhatsApp. Cadastro analisado em até 1 dia útil. Acesso à tabela é liberado.",
  },
  {
    code: "02",
    title: "Pedido entra no sistema.",
    body: "Cliente fecha pedido por canal comercial. Faturamento usa CNPJ do CD mais próximo do destino.",
  },
  {
    code: "03",
    title: "Picking e expedição no CD.",
    body: "Operação 3PL faz separação, conferência e expedição em até 48h úteis. Volume consolidado por rota.",
  },
  {
    code: "04",
    title: "Mercadoria na loja.",
    body: "Transportadora parceira entrega no destino. Rastreio compartilhado. Devolução por divergência tratada direto.",
  },
];

export function PedidoScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      setFrame(Math.min(FRAMES.length - 1, Math.floor(p * FRAMES.length * 0.999)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={wrap}
      className="pedido-scene"
      style={{
        position: "relative",
        background: "var(--color-petrol)",
        height: "var(--pedido-h, 320vh)",
        color: "var(--color-iced)",
      }}
      aria-label="Como o pedido vira entrega"
    >
      <div className="pedido-scene__sticky"
           style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0, right: 0,
            width: `${30 + progress * 70}%`,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(82,159,237,0.5))",
            transition: "width 200ms linear",
          }}
        />
        <div className="container-rp h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
            <div className="lg:col-span-3">
              <div className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase" style={{ color: "rgba(243,241,237,0.5)" }}>
                Capítulo 02 · Operação
              </div>
              <div className="mt-3 font-mono text-[0.6875rem] tracking-[0.22em] uppercase" style={{ color: "var(--color-blue-300)" }}>
                Como o pedido vira entrega
              </div>
              <ul className="mt-8 flex flex-col gap-3">
                {FRAMES.map((f, i) => (
                  <li key={f.code} className="flex items-center gap-3">
                    <span aria-hidden style={{
                      width: 28, height: 1,
                      background: i === frame ? "var(--color-blue)" : "rgba(243,241,237,0.18)",
                      transition: "background 360ms ease",
                    }} />
                    <span className="font-mono text-[0.625rem] tracking-[0.18em]"
                          style={{ color: i === frame ? "var(--color-iced)" : "rgba(243,241,237,0.4)", transition: "color 360ms ease" }}>
                      {f.code} · {f.title.split(".")[0]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-9 relative" style={{ minHeight: 320 }}>
              {FRAMES.map((f, i) => {
                const active = i === frame;
                return (
                  <div key={f.code}
                       style={{
                         position: "absolute",
                         inset: 0,
                         opacity: active ? 1 : 0,
                         transform: active ? "translateY(0)" : "translateY(20px)",
                         transition: "opacity 480ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1)",
                         pointerEvents: active ? "auto" : "none",
                       }}>
                    <div className="font-display"
                         style={{ fontSize: "clamp(8rem, 18vw, 17rem)", lineHeight: 0.9, color: "rgba(82,159,237,0.08)", fontWeight: 300, letterSpacing: "-0.04em" }}>
                      {f.code}
                    </div>
                    <h3 className="font-display"
                        style={{ fontSize: "clamp(2rem, 5vw, 4.25rem)", lineHeight: 0.98, letterSpacing: "-0.028em", fontWeight: 400, marginTop: -32 }}>
                      {f.title}
                    </h3>
                    <p style={{ marginTop: 28, maxWidth: "58ch", color: "rgba(243,241,237,0.78)", fontSize: "1.0625rem", lineHeight: 1.55 }}>
                      {f.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
