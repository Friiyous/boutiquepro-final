'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { sendOrderEmail } from '@/lib/resend'
import { notifyNewOrder } from '@/lib/sms'

const orderSchema = z.object({
    fullName: z.string().min(2, 'Nom requis'),
    phone: z.string().min(8, 'Téléphone requis'),
    address: z.string().min(5, 'Adresse requise'),
    total: z.number(),
    items: z.string() // JSON stringified for FormData
})

export async function processCheckout(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const rawData = Object.fromEntries(formData)
    const validatedFields = orderSchema.safeParse({
        ...rawData,
        total: Number(rawData.total),
    })

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const { fullName, phone, address, total, items } = validatedFields.data
    const parsedItems = JSON.parse(items)

    // 1. Create the order
    const { data: order, error: orderError } = await supabase
        .from('commandes')
        .insert([
            {
                nom_client: fullName,
                telephone_client: phone,
                adresse_livraison: address,
                total: total,
                statut: 'en_attente',
            }
        ])
        .select()
        .single()

    if (orderError) {
        return { error: 'Erreur lors de la création de la commande: ' + orderError.message }
    }

    // 2. Create order items
    const { error: itemsError } = await supabase
        .from('commande_items')
        .insert(
            parsedItems.map((item: any) => ({
                commande_id: order.id,
                produit_id: item.id,
                quantite: item.quantite,
                prix_unitaire: item.prix,
            }))
        )

    if (itemsError) {
        // Note: In production, we should handle this rollback or compensation
        return { error: 'Erreur lors de l\'ajout des produits: ' + itemsError.message }
    }

    // 3. Send notifications (Email & SMS)
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.email) {
            await sendOrderEmail({
                to: user.email,
                orderId: order.id,
                total: total,
                items: parsedItems,
            })
        }

        // Simulate SMS to Seller (Demo Number)
        await notifyNewOrder('+2250707070707', order.id, total)
    } catch (err) {
        console.error('Silent notification error:', err)
    }

    return { success: true, orderId: order.id }
}
