import nodemailer from "nodemailer"

/**
 * Transportador SMTP configurado via variáveis de ambiente.
 * Defina no .env:
 *   MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM
 *
 * Para dev/testes usa Ethereal (https://ethereal.email) se as vars não existirem.
 */
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.ethereal.email",
    port: Number(process.env.MAIL_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER || "",
        pass: process.env.MAIL_PASS || ""
    }
})

export interface MailOptions {
    to: string
    subject: string
    html: string
}

/**
 * Envia um e-mail. Em caso de falha apenas loga — nunca lança exceção,
 * para não bloquear a resposta HTTP principal.
 */
export async function sendMail(options: MailOptions): Promise<void> {
    try {
        const info = await transporter.sendMail({
            from: process.env.MAIL_FROM || "no-reply@servidor-local.com",
            to: options.to,
            subject: options.subject,
            html: options.html
        })
        console.log("[Mailer] E-mail enviado:", info.messageId)
    } catch (error) {
        console.error("[Mailer] Falha ao enviar e-mail:", error)
    }
}
