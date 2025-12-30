'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit faire au moins 6 caractères'),
})

const registerSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit faire au moins 6 caractères'),
    fullName: z.string().min(2, 'Nom trop court'),
    shopName: z.string().min(2, 'Nom de boutique trop court'),
    whatsapp: z.string().min(8, 'Numéro WhatsApp invalide'),
    category: z.string().min(2, 'Catégorie requise'),
    city: z.string().min(2, 'Ville requise'),
})

export async function login(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const rawData = Object.fromEntries(formData)
    const validatedFields = loginSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const { error } = await supabase.auth.signInWithPassword(validatedFields.data)

    if (error) {
        return { error: error.message }
    }

    redirect('/dashboard')
}

export async function register(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const rawData = Object.fromEntries(formData)
    const validatedFields = registerSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const { data, error } = await supabase.auth.signUp({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        options: {
            data: {
                full_name: validatedFields.data.fullName,
                shop_name: validatedFields.data.shopName,
                whatsapp: validatedFields.data.whatsapp,
                category: validatedFields.data.category,
                city: validatedFields.data.city,
            }
        }
    })

    if (error) {
        return { error: error.message }
    }

    redirect('/dashboard')
}
