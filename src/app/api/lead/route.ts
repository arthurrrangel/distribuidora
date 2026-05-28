import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, cnpj, phone, message, source } = body || {};
    if (!name || !email || !cnpj) {
      return NextResponse.json({ ok: false, error: "Campos obrigatórios: nome, e-mail, CNPJ." }, { status: 400 });
    }
    const apiKey = process.env.RESEND_API_KEY;
    const toAddr = process.env.LEAD_INBOX || "comercial@repondistribuidora.com";
    const subject = `[Site Repon] ${source || "Lead"} — ${name}`;
    const html = `
      <h2>Nova lead pelo site</h2>
      <p><strong>Origem:</strong> ${source || "formulário"}</p>
      <ul>
        <li><strong>Nome:</strong> ${name}</li>
        <li><strong>E-mail:</strong> ${email}</li>
        <li><strong>CNPJ:</strong> ${cnpj}</li>
        ${phone ? `<li><strong>Telefone:</strong> ${phone}</li>` : ""}
      </ul>
      ${message ? `<p><strong>Mensagem:</strong></p><p>${String(message).replace(/[<>]/g, "")}</p>` : ""}
    `;
    if (apiKey) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          from: "Repon Site <site@repondistribuidora.com>",
          to: [toAddr],
          reply_to: email,
          subject,
          html,
        }),
      });
      if (!r.ok) {
        const txt = await r.text();
        console.error("Resend error", r.status, txt);
        return NextResponse.json({ ok: false, error: "Falha ao enviar." }, { status: 502 });
      }
    } else {
      // Sem Resend configurado: log apenas. Pra produção, configure RESEND_API_KEY.
      console.log("[LEAD]", JSON.stringify({ name, email, cnpj, phone, source }));
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Erro interno." }, { status: 500 });
  }
}
