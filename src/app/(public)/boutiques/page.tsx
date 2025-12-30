'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Store, Star, ChevronRight, SlidersHorizontal, LayoutGrid, List } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase/client'

const CATEGORIES = ['Toutes', 'Mode', 'Électronique', 'Maison', 'Beauté', 'Alimentation']
const CITIES = ['Toutes', 'Abidjan', 'Bouaké', 'Yamoussoukro', 'Korhogo', 'San Pedro']

const MOCK_BOUTIQUES = [
    {
        id: 'b1',
        nom: 'Sonia Fashion',
        description: 'Boutique de mode chic à Cocody Riviera 3.',
        logo_url: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=200&h=200&fit=crop',
        ville: 'Abidjan',
        quartier: 'Cocody',
        rating: 4.8,
        categorie: 'Mode',
        slug: 'sonia-fashion'
    },
    {
        id: 'b2',
        nom: 'Electro-Zone CI',
        description: 'Le meilleur du high-tech à Marcory Zone 4.',
        logo_url: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=200&h=200&fit=crop',
        ville: 'Abidjan',
        quartier: 'Marcory',
        rating: 4.5,
        categorie: 'Électronique',
        slug: 'electro-zone'
    },
    {
        id: 'b3',
        nom: 'Maison & Déco',
        description: 'Artisanat et décoration moderne pour votre intérieur.',
        logo_url: 'https://images.unsplash.com/photo-1513519247388-4e28371ee11c?w=200&h=200&fit=crop',
        ville: 'Yamoussoukro',
        quartier: 'Centre',
        rating: 4.9,
        categorie: 'Maison',
        slug: 'maison-deco'
    }
]

export default function BoutiquesPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('Toutes')
    const [selectedCity, setSelectedCity] = useState('Toutes')
    const [boutiques, setBoutiques] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchBoutiques = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('boutiques')
            .select('*')

        if (!error && data && data.length > 0) {
            setBoutiques(data)
        } else {
            setBoutiques(MOCK_BOUTIQUES)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchBoutiques()
    }, [])

    const filteredBoutiques = boutiques.filter(b => {
        const matchesSearch = b.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'Toutes' || b.categorie === selectedCategory
        const matchesCity = selectedCity === 'Toutes' || b.ville === selectedCity
        return matchesSearch && matchesCategory && matchesCity
    })

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24">
            {/* Hero Filter Section */}
            <div className="bg-white border-b border-gray-100 pt-16 pb-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black text-boutique-dark tracking-tight"
                        >
                            Explorez les <span className="text-boutique-orange">Boutiques</span>
                        </motion.h1>
                        <p className="text-gray-400 mt-4 font-medium">Trouvez les meilleurs vendeurs locaux en un clic.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <Input
                                placeholder="Nom, produit, ville..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 py-7 rounded-2xl bg-gray-50 border-none focus-visible:ring-boutique-orange/20 text-lg shadow-sm"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-sm outline-none focus:ring-2 focus:ring-boutique-orange/20 shadow-sm"
                            >
                                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Category Pills */}
                    <div className="mt-10 flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all ${selectedCategory === cat
                                        ? 'bg-boutique-orange text-white shadow-lg shadow-boutique-orange/20 scale-105'
                                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-2xl font-black text-boutique-dark">Boutiques disponibles</h2>
                        <p className="text-gray-400 text-sm font-bold mt-1">{filteredBoutiques.length} commerçants trouvés</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-100">
                        <button className="p-2 bg-gray-50 rounded-lg text-boutique-orange"><LayoutGrid size={18} /></button>
                        <button className="p-2 text-gray-300 hover:bg-gray-50 rounded-lg transition-colors"><List size={18} /></button>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white p-8 rounded-[3rem] h-64 animate-pulse border border-gray-100" />
                        ))}
                    </div>
                ) : filteredBoutiques.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100 shadow-sm">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Store size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-black text-boutique-dark">Aucune boutique trouvée</h3>
                        <p className="text-gray-400 mt-2 font-medium">Réessayez avec d&apos;autres filtres ou mots-clés.</p>
                        <Button variant="link" onClick={() => { setSearchTerm(''); setSelectedCategory('Toutes'); setSelectedCity('Toutes'); }} className="text-boutique-orange font-bold mt-4">
                            Réinitialiser les filtres
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredBoutiques.map((boutique, i) => (
                                <motion.div
                                    key={boutique.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2 transition-all group flex flex-col justify-between"
                                >
                                    <Link href={`/boutique/${boutique.slug}`} className="block">
                                        <div className="flex items-start gap-6">
                                            <div className="relative w-20 h-20 rounded-[2rem] overflow-hidden border-2 border-gray-50 flex-shrink-0 shadow-inner group-hover:rotate-6 transition-transform">
                                                <Image src={boutique.logo_url || boutique.logo} alt={boutique.nom} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h3 className="font-ex-bold text-xl text-boutique-dark truncate">{boutique.nom}</h3>
                                                    <div className="flex items-center gap-1 text-yellow-500 text-sm font-black flex-shrink-0">
                                                        <Star size={14} className="fill-yellow-500" />
                                                        {boutique.rating || 4.7}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Badge className="bg-boutique-orange/10 text-boutique-orange hover:bg-boutique-orange/20 border-none text-[9px] font-black uppercase px-2 py-0.5 rounded-lg">
                                                        {boutique.categorie}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400 mt-6 line-clamp-2 leading-relaxed font-medium">{boutique.description}</p>

                                        <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider">
                                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-boutique-orange">
                                                    <MapPin size={14} />
                                                </div>
                                                {boutique.quartier || 'Centre'}, {boutique.ville}
                                            </div>
                                            <div className="w-12 h-12 bg-boutique-dark text-white rounded-2xl flex items-center justify-center group-hover:bg-boutique-orange transition-all shadow-lg shadow-boutique-dark/10 group-hover:shadow-boutique-orange/20 group-hover:rotate-12">
                                                <ChevronRight size={24} />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    )
}
