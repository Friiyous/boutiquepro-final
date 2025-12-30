'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Settings,
    LogOut,
    Store,
    ChevronRight,
    Menu,
    X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthGuard } from '@/components/auth/auth-guard'
import { useAuth } from '@/components/providers/auth-provider'

const menuItems = [
    { icon: <LayoutDashboard size={22} />, label: 'Dashboard', href: '/dashboard' },
    { icon: <Package size={22} />, label: 'Produits', href: '/produits' },
    { icon: <ShoppingBag size={22} />, label: 'Commandes', href: '/commandes' },
    { icon: <Settings size={22} />, label: 'Paramètres', href: '/parametres' },
]

export default function BoutiqueLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)
    const { signOut } = useAuth()

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gray-50 flex">
                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                        />
                    )}
                </AnimatePresence>

                {/* Sidebar */}
                <motion.aside
                    className={`fixed lg:sticky top-0 left-0 h-screen w-[280px] bg-white border-r border-gray-100 z-50 transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <div className="h-full flex flex-col p-6">
                        <Link href="/" className="flex items-center gap-2 mb-12 px-2">
                            <div className="bg-boutique-orange p-2 rounded-xl text-white">
                                <Store size={24} />
                            </div>
                            <span className="text-xl font-black text-boutique-dark">
                                Boutique<span className="text-boutique-orange">Pro</span>
                            </span>
                        </Link>

                        <nav className="flex-1 space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${pathname === item.href
                                        ? 'bg-boutique-orange/10 text-boutique-orange shadow-sm'
                                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-700'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        {item.label}
                                    </div>
                                    {pathname === item.href && <ChevronRight size={18} />}
                                </Link>
                            ))}
                        </nav>

                        <button
                            onClick={() => signOut()}
                            className="mt-auto flex items-center gap-3 p-4 rounded-2xl font-bold text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                        >
                            <LogOut size={22} />
                            Déconnexion
                        </button>
                    </div>
                </motion.aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-h-screen">
                    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 lg:hidden">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            <Menu size={24} className="text-boutique-dark" />
                        </button>
                    </header>

                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </AuthGuard>
    )
}
