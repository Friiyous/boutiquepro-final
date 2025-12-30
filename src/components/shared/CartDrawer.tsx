'use client'

import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerFooter
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/store'
import { formatFCFA } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function CartDrawer({ children }: { children: React.ReactNode }) {
    const { items, removeItem, updateQuantite, total } = useCart()

    return (
        <Drawer>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className="rounded-t-[2.5rem] bg-white max-h-[90vh]">
                <div className="mx-auto w-full max-w-2xl px-6 pb-12">
                    <DrawerHeader>
                        <DrawerTitle className="text-2xl font-black text-boutique-dark flex items-center gap-3 mt-4">
                            <div className="bg-boutique-orange/10 p-2 rounded-xl text-boutique-orange">
                                <ShoppingBag size={24} />
                            </div>
                            Votre Panier
                        </DrawerTitle>
                    </DrawerHeader>

                    <div className="mt-8 space-y-6 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
                        {items.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <ShoppingCart size={32} className="text-gray-300" />
                                </div>
                                <p className="text-gray-400 font-bold">Votre panier est vide</p>
                                <DrawerClose asChild>
                                    <Button variant="link" className="text-boutique-orange font-bold mt-2">Continuer vos achats</Button>
                                </DrawerClose>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-[2rem] border border-gray-100 group transition-all">
                                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-white shadow-sm border border-gray-100">
                                        <Image src={item.image} alt={item.nom} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-boutique-dark truncate">{item.nom}</h4>
                                        <p className="text-boutique-orange font-black mt-1">{formatFCFA(item.prix)}</p>

                                        <div className="flex items-center gap-3 mt-3">
                                            <div className="flex items-center bg-white rounded-xl border border-gray-100 p-1">
                                                <button
                                                    onClick={() => updateQuantite(item.id, item.quantite - 1)}
                                                    className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 transition-colors"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-bold">{item.quantite}</span>
                                                <button
                                                    onClick={() => updateQuantite(item.id, item.quantite + 1)}
                                                    className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-white rounded-xl transition-all"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="mt-10 pt-8 border-t border-gray-50">
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total estimé</span>
                                <span className="text-3xl font-black text-boutique-dark">{formatFCFA(total())}</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button asChild className="w-full bg-boutique-dark hover:bg-boutique-dark/90 text-white py-8 rounded-2xl font-black text-lg shadow-xl" size="lg">
                                    <Link href="/paiement">
                                        Commander Maintenant
                                    </Link>
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant="ghost" className="text-gray-400 font-bold hover:bg-gray-50">Continuer mes achats</Button>
                                </DrawerClose>
                            </div>
                        </div>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    )
}
