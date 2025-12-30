'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

const productSchema = z.object({
    nom: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
    description: z.string().min(10, 'La description doit faire au moins 10 caractères'),
    prix: z.coerce.number().positive('Le prix doit être positif'),
    stock: z.coerce.number().int().nonnegative('Le stock ne peut pas être négatif'),
    categorie: z.string().min(2, 'Catégorie requise'),
    image_url: z.string().url('URL invalide').optional().or(z.literal('')),
})

export async function createProduct(prevState: any, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Non authentifié' }
    }

    const rawData = Object.fromEntries(formData)
    const validatedFields = productSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const { error } = await supabase.from('produits').insert([
        {
            ...validatedFields.data,
            vendeur_id: user.id,
        }
    ])

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/produits')
    return { success: true }
}

export async function deleteProduct(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('produits').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/produits')
    return { success: true }
}
