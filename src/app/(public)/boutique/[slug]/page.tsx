import { createClient } from '@/lib/supabase/server'
import type { Metadata, ResolvingMetadata } from 'next'
import React from 'react'
import Image from 'next/image'
import { MapPin, Star } from 'lucide-react'
import { MOCK_BOUTIQUE, MOCK_PRODUITS } from '@/lib/mock-data'
import ProductCard from '@/components/shared/ProductCard'
import * as motion from 'framer-motion/m'

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params
    const supabase = await createClient()

    const { data: boutique } = await supabase
        .from('boutiques')
        .select('nom, description, logo_url, couverture_url')
        .eq('slug', slug)
        .single()

    const siteName = 'BoutiquePro.ci'
    const title = boutique ? `${boutique.nom} | ${siteName}` : `Boutique | ${siteName}`
    const description = boutique?.description || "Découvrez cette boutique sur BoutiquePro.ci"
    const image = boutique?.logo_url || boutique?.couverture_url || 'https://boutiquepro.ci/og-image.png'

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [image],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    }
}

export default async function BoutiquePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const supabase = await createClient()

    // Fetch boutique data
    const { data: boutiqueData } = await supabase
        .from('boutiques')
        .select('*')
        .eq('slug', slug)
        .single()

    const boutique = boutiqueData || MOCK_BOUTIQUE

    // Fetch products
    const { data: productsData } = await supabase
        .from('produits')
        .select('*')
        .eq('vendeur_id', boutiqueData?.vendeur_id || 'mock')

    const products = (productsData && productsData.length > 0) ? productsData : MOCK_PRODUITS

    return (
        <div className="pb-20">
            <div className="relative h-[300px] md:h-[400px]">
                <Image src={boutique.couverture_url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop'} alt={boutique.nom} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-6">
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-white">
                            <Image src={boutique.logo_url || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=200&h=200&fit=crop'} alt={boutique.nom} fill className="object-cover" />
                        </motion.div>
                        <div className="flex-1 text-white pb-2">
                            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-3xl md:text-5xl font-extrabold">{boutique.nom}</motion.h1>
                            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm md:text-base font-medium opacity-90">
                                <div className="flex items-center gap-1.5"><MapPin size={18} className="text-boutique-orange" />{boutique.quartier || 'Abidjan'}, {boutique.ville || 'CI'}</div>
                                <div className="flex items-center gap-1.5"><Star size={18} className="text-yellow-400 fill-yellow-400" />4.8 (120 avis)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
                <div className="mb-12">
                    <h2 className="text-2xl font-black text-boutique-dark mb-4">À propos</h2>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-3xl">{boutique.description}</p>
                </div>

                <h2 className="text-2xl font-black text-boutique-dark mb-8">Nos Produits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((p: { id: string, nom: string, description: string, prix: number, prix_promo?: number, image_url?: string, image?: string, boutique_id?: string }) => (
                        <ProductCard
                            key={p.id}
                            id={p.id}
                            nom={p.nom}
                            description={p.description}
                            prix={p.prix}
                            prix_promo={p.prix_promo}
                            image={p.image_url || p.image || '/placeholder-product.png'}
                            boutique_id={p.boutique_id || boutique.id}
                            whatsapp={boutique.whatsapp}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
