import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder')

export async function sendOrderEmail({ to, orderId, total, items }: { to: string, orderId: string, total: number, items: any[] }) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'BoutiquePro.ci <notifications@boutiquepro.ci>',
            to: [to],
            subject: `Confirmation de votre commande #${orderId.slice(0, 8)}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h1 style="color: #FF6B35;">Merci pour votre commande !</h1>
          <p>Votre commande <strong>#${orderId.slice(0, 8)}</strong> a été reçue et est en cours de traitement.</p>
          <hr />
          <h3>Détails de la commande</h3>
          <ul>
            ${items.map(item => `<li>${item.nom} x ${item.quantite} - ${item.prix * item.quantite} FCFA</li>`).join('')}
          </ul>
          <p><strong>Total: ${total} FCFA</strong></p>
          <hr />
          <p>L'équipe BoutiquePro.ci</p>
        </div>
      `,
        })

        if (error) {
            console.error('Resend Error:', error)
            return { error }
        }

        return { success: true, data }
    } catch (error) {
        console.error('Email caught error:', error)
        return { error }
    }
}
