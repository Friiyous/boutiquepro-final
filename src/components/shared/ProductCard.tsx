'use client'

import Image from 'next/image'
import { ShoppingCart, Plus, MessageCircle } from 'lucide-react'
import { formatFCFA } from '@/lib/utils'
import { useCart } from '@/lib/store'
import { motion } from 'framer-motion'

interface ProductCardProps {
    id: string
    nom: string
    description: string
    prix: number
    prix_promo?: number
    image: string
    boutique_id: string
    whatsapp?: string
}

export default function ProductCard({
    id,
    nom,
    description,
    prix,
    prix_promo,
    image,
    boutique_id,
    whatsapp = '+2250707070707' // Fallback demo number
}: ProductCardProps) {
    const addItem = useCart((state) => state.addItem)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Image
                    src={image}
                    alt={nom}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {prix_promo && (
                    <div className="absolute top-4 left-4 bg-boutique-danger text-white text-xs font-bold px-3 py-1 rounded-full">
                        PROMO
                    </div>
                )}
                <button
                    onClick={() => addItem({ id, nom, prix: prix_promo || prix, image, quantite: 1, boutiqueId: boutique_id })}
                    className="absolute bottom-4 right-4 bg-boutique-primary text-white p-3 rounded-xl shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-boutique-primary/90"
                    title="Ajouter au panier"
                >
                    <Plus size={20} />
                </button>
                <a
                    href={`https://wa.me/${whatsapp.replace('+', '')}?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par votre produit "${nom}" sur BoutiquePro.ci.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 left-4 bg-green-500 text-white p-3 rounded-xl shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-green-600"
                    title="Commander via WhatsApp"
                >
                    <MessageCircle size={20} />
                </a>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-semibold text-boutique-dark line-clamp-1">{nom}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-[40px]">{description}</p>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        {prix_promo ? (
                            <>
                                <span className="text-boutique-danger font-bold text-xl">{formatFCFA(prix_promo)}</span>
                                <span className="text-gray-400 text-sm line-through">{formatFCFA(prix)}</span>
                            </>
                        ) : (
                            <span className="text-boutique-dark font-bold text-xl">{formatFCFA(prix)}</span>
                        )}
                    </div>

                    <button
                        onClick={() => addItem({ id, nom, prix: prix_promo || prix, image, quantite: 1, boutiqueId: boutique_id })}
                        className="text-boutique-primary hover:bg-boutique-primary/10 p-2 rounded-full transition-colors md:hidden"
                    >
                        <ShoppingCart size={24} />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
