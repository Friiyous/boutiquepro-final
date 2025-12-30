'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, User, Store, LogOut, X, ChevronRight } from 'lucide-react'
import { useCart } from '@/lib/store'
import { CartDrawer } from './CartDrawer'
import { useAuth } from '@/components/providers/auth-provider'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Navbar() {
    const itemsCount = useCart((state) => state.items.length)
    const { user, signOut } = useAuth()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const CartButton = (
        <button
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
        >
            <ShoppingBag size={22} />
            {mounted && itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-boutique-orange text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {itemsCount}
                </span>
            )}
        </button>
    )

    return (
        <>
            <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-boutique-orange p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
                            <Store size={24} />
                        </div>
                        <span className="text-xl font-bold text-boutique-dark hidden sm:inline-block tracking-tight">
                            Boutique<span className="text-boutique-orange">Pro</span>.ci
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-500">
                        <Link href="/boutiques" className="hover:text-boutique-orange transition-colors">Explorer</Link>
                        <Link href="/comment-ca-marche" className="hover:text-boutique-orange transition-colors">Comment ça marche</Link>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {mounted ? (
                            <CartDrawer>
                                {CartButton}
                            </CartDrawer>
                        ) : CartButton}

                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link href="/dashboard" className="hidden sm:flex items-center gap-2 bg-boutique-orange/10 text-boutique-orange px-4 py-2 rounded-xl text-sm font-bold hover:bg-boutique-orange/20 transition-all border border-boutique-orange/10">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors hidden sm:block"
                                    title="Déconnexion"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link href="/auth/login" className="flex items-center gap-2 bg-boutique-dark text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-boutique-dark/90 transition-all shadow-md active:scale-95">
                                <User size={18} />
                                <span className="hidden sm:inline">Vendre</span>
                            </Link>
                        )}

                        <button
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="lg:hidden fixed inset-x-0 top-20 bg-white border-b border-gray-100 shadow-2xl z-30 p-6 flex flex-col gap-4 font-bold text-gray-600"
                    >
                        <Link href="/boutiques" onClick={() => setIsMobileMenuOpen(false)}>Explorer les boutiques</Link>
                        <Link href="/comment-ca-marche" onClick={() => setIsMobileMenuOpen(false)}>Comment ça marche</Link>
                        <div className="h-px bg-gray-50 my-2" />
                        {user ? (
                            <>
                                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-boutique-orange flex items-center justify-between">
                                    Mon Dashboard <ChevronRight size={18} />
                                </Link>
                                <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="text-red-500 text-left">Déconnexion</button>
                            </>
                        ) : (
                            <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-boutique-orange text-white p-4 rounded-2xl text-center">Connexion Vendeur</Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
