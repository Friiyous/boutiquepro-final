'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, ChevronRight, Eye, MoreVertical } from 'lucide-react'

const ORDERS = [
    { id: '#ORD-7834', client: 'Marc Kouadio', date: '29 Déc 2024', total: 27500, status: 'Confirmée', color: 'bg-orange-50 text-orange-600' },
    { id: '#ORD-7833', client: 'Awa Koné', date: '28 Déc 2024', total: 12000, status: 'En livraison', color: 'bg-blue-50 text-blue-600' },
    { id: '#ORD-7832', client: 'Jean-Luc G.', date: '28 Déc 2024', total: 45000, status: 'Livrée', color: 'bg-green-50 text-green-600' },
    { id: '#ORD-7831', client: 'Binta Diallo', date: '27 Déc 2024', total: 8500, status: 'Annulée', color: 'bg-red-50 text-red-600' },
]

export default function OrdersPage() {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-boutique-dark">Gestion des Commandes</h1>
                    <p className="text-gray-500 mt-1">Suivez et gérez les ventes de votre boutique en temps réel.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-white p-2 rounded-2xl border border-gray-100 flex items-center gap-3">
                    <Search className="text-gray-400 ml-4" size={20} />
                    <input type="text" placeholder="Rechercher une commande (ID, client...)" className="flex-1 bg-transparent border-none outline-none py-3 font-medium placeholder:text-gray-300" />
                </div>
                <button className="bg-white border border-gray-100 px-6 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-gray-500 hover:bg-gray-50 transition-all">
                    <Filter size={20} />
                    Filtrer
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                <th className="px-8 py-6">ID Commande</th>
                                <th className="px-6 py-6">Client</th>
                                <th className="px-6 py-6">Montant</th>
                                <th className="px-6 py-6">Statut</th>
                                <th className="px-8 py-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {ORDERS.map((order, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6 font-bold text-boutique-dark">{order.id}</td>
                                    <td className="px-6 py-6">
                                        <div className="font-bold text-gray-700">{order.client}</div>
                                        <div className="text-xs text-gray-400">{order.date}</div>
                                    </td>
                                    <td className="px-6 py-6 font-black text-boutique-dark">{order.total.toLocaleString()} FCFA</td>
                                    <td className="px-6 py-6">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${order.color}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 text-gray-400">
                                            <button className="p-2 hover:bg-boutique-primary/10 hover:text-boutique-primary rounded-xl transition-all"><Eye size={18} /></button>
                                            <button className="p-2 hover:bg-gray-100 rounded-xl transition-all"><MoreVertical size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
