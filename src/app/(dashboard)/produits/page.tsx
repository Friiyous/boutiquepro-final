'use client'

import React, { useState, useEffect } from 'react'
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
} from 'lucide-react'
import { formatFCFA } from '@/lib/utils'
import Image from 'next/image'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProductForm } from '@/components/products/product-form'
import { supabase } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'

export default function ProduitsPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [produits, setProduits] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchProduits = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('produits')
            .select('*')
            .order('created_at', { ascending: false })

        if (!error && data) {
            setProduits(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchProduits()
    }, [])

    const filteredProduits = produits.filter(p =>
        p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categorie.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-boutique-dark">Gestion Catalogue</h1>
                    <p className="text-gray-500 mt-1">Gérez vos produits, stock et prix.</p>
                </div>

                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-boutique-orange hover:bg-boutique-orange/90 text-white px-6 py-6 rounded-2xl font-black shadow-xl shadow-boutique-orange/10 transition-all gap-2">
                            <Plus size={20} />
                            Ajouter un produit
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] rounded-[2rem]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black">Nouveau Produit</DialogTitle>
                        </DialogHeader>
                        <ProductForm onSuccess={() => {
                            setIsAddOpen(false)
                            fetchProduits()
                        }} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        placeholder="Rechercher un produit..."
                        className="pl-12 py-7 rounded-2xl bg-white border-gray-100 shadow-sm focus-visible:ring-boutique-orange/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="py-7 px-6 rounded-2xl border-gray-100 font-bold gap-2">
                    <Filter size={20} />
                    Filtres
                </Button>
            </div>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow className="hover:bg-transparent border-gray-100">
                            <TableHead className="px-8 py-5 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Produit</TableHead>
                            <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-widest">Catégorie</TableHead>
                            <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-widest">Prix</TableHead>
                            <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-widest">Stock</TableHead>
                            <TableHead className="px-8 py-5 text-right font-bold text-gray-400 uppercase text-[10px] tracking-widest">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-20 text-gray-400 font-medium">
                                    Chargement du catalogue...
                                </TableCell>
                            </TableRow>
                        ) : filteredProduits.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-20 text-gray-400 font-medium">
                                    {searchTerm ? 'Aucun produit ne correspond à votre recherche.' : 'Votre catalogue est vide.'}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredProduits.map((p) => (
                                <TableRow key={p.id} className="hover:bg-gray-50/50 transition-colors group border-gray-50">
                                    <TableCell className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-50">
                                                {p.image_url ? (
                                                    <Image src={p.image_url} alt={p.nom} fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        Image
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-boutique-dark">{p.nom}</div>
                                                <div className="text-[10px] text-gray-400 uppercase tracking-tighter">SKU: {p.id.slice(0, 8)}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-none rounded-lg px-2">
                                            {p.categorie}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-bold text-boutique-dark">{formatFCFA(p.prix)}</TableCell>
                                    <TableCell>
                                        <div className={`text-sm font-black ${p.stock <= 3 ? 'text-red-500' : 'text-gray-700'}`}>
                                            {p.stock}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-boutique-orange">
                                                <Edit size={16} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500">
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
