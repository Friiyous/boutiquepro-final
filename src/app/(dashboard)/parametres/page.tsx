'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Store, User, Smartphone, MapPin, CreditCard, Bell, Shield, ArrowRight } from 'lucide-react'

const TABS = [
    { id: 'profile', label: 'Profil & Boutique', icon: Store },
    { id: 'paiments', label: 'Paiements', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'securite', label: 'Sécurité', icon: Shield },
]

export default function SettingsPage() {
    const [activeTab, setActiveTab] = React.useState('profile')

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
            <div>
                <h1 className="text-3xl font-black text-boutique-dark">Paramètres</h1>
                <p className="text-gray-500 mt-1">Gérez votre compte et personnalisez votre expérience de vente.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="lg:w-72 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-boutique-primary text-white shadow-lg shadow-boutique-primary/20'
                                : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            <tab.icon size={20} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 space-y-6">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm"
                    >
                        {activeTab === 'profile' && (
                            <div className="space-y-10">
                                <div>
                                    <h2 className="text-xl font-black text-boutique-dark mb-6">Informations de la Boutique</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-400 ml-1">Nom de la boutique</label>
                                            <input type="text" defaultValue="Sonia Fashion" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-boutique-primary/10 outline-none font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-400 ml-1">Catégorie</label>
                                            <select className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-boutique-primary/10 outline-none font-bold text-gray-700">
                                                <option>Mode & Prêt-à-porter</option>
                                                <option>Électronique</option>
                                                <option>Maison & Déco</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-black text-boutique-dark mb-6">Contact & Livraison</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-400 ml-1">Numéro WhatsApp</label>
                                            <input type="tel" defaultValue="+225 07 00 00 00 00" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-boutique-primary/10 outline-none font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-400 ml-1">Ville de base</label>
                                            <input type="text" defaultValue="Abidjan" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-boutique-primary/10 outline-none font-bold" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button className="bg-boutique-primary text-white py-4 px-10 rounded-2xl font-black text-lg shadow-xl shadow-boutique-primary/20 hover:scale-[1.02] transition-all">
                                        Enregistrer les modifications
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab !== 'profile' && (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="bg-gray-50 p-6 rounded-full text-gray-200 mb-6">
                                    {React.createElement(TABS.find(t => t.id === activeTab)?.icon || Store, { size: 64 })}
                                </div>
                                <h2 className="text-2xl font-black text-boutique-dark">Bientôt Disponible</h2>
                                <p className="text-gray-500 max-w-xs mt-2">
                                    Nous peaufinons cette fonctionnalité pour vous offrir la meilleure expérience possible.
                                </p>
                            </div>
                        )}
                    </motion.div>

                    <div className="bg-orange-50/50 border border-orange-100 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6">
                        <div className="bg-orange-100 p-4 rounded-2xl text-orange-600">
                            <Shield size={32} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-lg font-black text-boutique-dark">Certification Vendeur Pro</h3>
                            <p className="text-gray-500 text-sm mt-1">Augmentez la confiance de vos clients en certifiant votre identité.</p>
                        </div>
                        <button className="whitespace-nowrap bg-white text-boutique-dark px-8 py-3 rounded-xl font-bold border border-orange-200 hover:bg-orange-50 transition-all">
                            Démarrer la vérification
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
