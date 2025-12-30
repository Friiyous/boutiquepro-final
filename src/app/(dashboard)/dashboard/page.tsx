'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    TrendingUp,
    Package,
    Users,
    AlertTriangle,
    Plus,
    Bell,
    MoreVertical,
    ChevronRight,
    Gift
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatFCFA } from '@/lib/utils'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts'

const metrics = [
    {
        title: "Ventes Aujourd'hui",
        value: "125,000 FCFA",
        change: "+15%",
        icon: <TrendingUp size={20} />,
        color: "bg-boutique-primary"
    },
    {
        title: "Commandes en Cours",
        value: "8",
        change: "+2",
        icon: <Package size={20} />,
        color: "bg-boutique-secondary"
    },
    {
        title: "Produits en Rupture",
        value: "3",
        change: "-1",
        icon: <AlertTriangle size={20} />,
        color: "bg-boutique-danger"
    },
    {
        title: "C.A Total Mensuel",
        value: "1,450,000 FCFA",
        change: "+8%",
        icon: <Users size={20} />,
        color: "bg-boutique-accent"
    }
]

const recentOrders = [
    { id: 'CMD-ABJ-5629', client: 'Jean Kouassi', total: 27500, status: 'Confirmée', date: 'Il y a 10 min' },
    { id: 'CMD-ABJ-5628', client: 'Marie Traoré', total: 12500, status: 'En livraison', date: 'Il y a 45 min' },
    { id: 'CMD-ABJ-5627', client: 'Koffi Ahmed', total: 45000, status: 'Livrée', date: 'Il y a 2h' },
    { id: 'CMD-ABJ-5626', client: 'Sonia Bakayoko', total: 8500, status: 'Annulée', date: 'Il y a 3h' },
]

const chartData = [
    { name: 'Lun', sales: 45000 },
    { name: 'Mar', sales: 52000 },
    { name: 'Mer', sales: 38000 },
    { name: 'Jeu', sales: 65000 },
    { name: 'Ven', sales: 48000 },
    { name: 'Sam', sales: 85000 },
    { name: 'Dim', sales: 32000 },
]

const topProductsData = [
    { name: 'Robes', sales: 2400 },
    { name: 'Sacs', sales: 1800 },
    { name: 'Talons', sales: 1500 },
    { name: 'Bijoux', sales: 900 },
]

const COLORS = ['#FF6B35', '#2B2B2B', '#FFD166', '#06D6A0'];

function SalesChart() {
    // ... same code as before but I'll add the new chart below
    return (
        <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }}
                        tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '16px',
                            border: 'none',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            fontWeight: 'bold'
                        }}
                        formatter={(value: string | number | undefined) => {
                            if (typeof value === 'number') return [formatFCFA(value), 'Ventes']
                            return [value || '', 'Ventes']
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#FF6B35"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorSales)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

function TopProductsChart() {
    return (
        <div className="h-[200px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProductsData}>
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: 'transparent' }}
                    />
                    <Bar dataKey="sales" radius={[10, 10, 0, 0]}>
                        {topProductsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default function DashboardPage() {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
            {/* Header omitted for brevity in targetContent but I will replace the whole body */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-boutique-dark">Tableau de Bord</h1>
                    <p className="text-gray-500 mt-1">Bienvenue dans votre espace vendeur, Sonia.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-boutique-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-boutique-primary/20 hover:scale-105 transition-all">
                        <Plus size={20} />
                        Nouveau Produit
                    </button>
                    <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-500 hover:bg-gray-50 transition-colors">
                        <Bell size={20} />
                    </button>
                </div>
            </div>

            {/* Metrics Grid omitted but I'll keep it in the replacement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <div className={`${m.color} text-white p-3 rounded-2xl shadow-lg`}>
                                {m.icon}
                            </div>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${m.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                {m.change}
                            </span>
                        </div>
                        <div className="mt-6">
                            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">{m.title}</p>
                            <h3 className="text-2xl font-black text-boutique-dark mt-2">{m.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Analytics & Orders Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-black text-boutique-dark">Performance des ventes</h2>
                                <p className="text-gray-400 text-sm font-bold">Evolution hebdomadaire</p>
                            </div>
                            <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold outline-none">
                                <option>7 derniers jours</option>
                                <option>30 derniers jours</option>
                            </select>
                        </div>
                        <SalesChart />
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-boutique-dark">Commandes Récentes</h2>
                            <button className="text-boutique-primary font-bold text-sm flex items-center gap-1 hover:underline">
                                Voir Tout
                                <ChevronRight size={16} />
                            </button>
                        </div>

                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden text-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <th className="px-8 py-5">Code</th>
                                            <th className="px-6 py-5">Client</th>
                                            <th className="px-6 py-5">Montant</th>
                                            <th className="px-6 py-5">Statut</th>
                                            <th className="px-8 py-5 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 font-bold">
                                        {recentOrders.map((order, i) => (
                                            <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-8 py-5 text-boutique-dark">{order.id}</td>
                                                <td className="px-6 py-5">
                                                    <div className="text-gray-700">{order.client}</div>
                                                    <div className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">{order.date}</div>
                                                </td>
                                                <td className="px-6 py-5 text-boutique-dark">{formatFCFA(order.total)}</td>
                                                <td className="px-6 py-5">
                                                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${order.status === 'Confirmée' ? 'bg-orange-50 text-orange-600' :
                                                        order.status === 'En livraison' ? 'bg-blue-50 text-blue-600' :
                                                            order.status === 'Livrée' ? 'bg-green-50 text-green-600' :
                                                                'bg-red-50 text-red-600'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button className="p-2 text-gray-400 hover:text-boutique-primary transition-colors">
                                                        <MoreVertical size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-boutique-dark text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 w-40 h-40 bg-boutique-primary/20 blur-3xl group-hover:scale-110 transition-transform" />
                        <h3 className="text-2xl font-black mb-4 relative z-10">Promotion SMS</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8 relative z-10 font-bold">
                            Fidélisez vos <span className="text-white">120 clients</span>. Envoyez une offre spéciale par SMS ou WhatsApp en un instant.
                        </p>
                        <button className="w-full bg-boutique-orange text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-boutique-orange/20">
                            Lancer une campagne
                        </button>
                    </div>

                    <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-black text-boutique-dark mb-2">Produits Phares</h3>
                        <p className="text-gray-400 text-xs font-bold mb-4">Volume de ventes par catégorie</p>
                        <TopProductsChart />
                    </div>

                    <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-black text-boutique-dark mb-6">Stock Critique</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Robe d&apos;été Fleurie', stock: 2 },
                                { name: 'iPhone 13 Pro', stock: 0 },
                                { name: 'Vase Artisanal', stock: 3 },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <span className="font-bold text-sm text-gray-700">{item.name}</span>
                                    <Badge className={`${item.stock === 0 ? 'bg-red-500' : 'bg-orange-500'} text-white border-none font-black`}>
                                        {item.stock} restants
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-boutique-orange to-orange-600 p-8 rounded-[3rem] text-white shadow-xl shadow-boutique-orange/20">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-white/20 p-3 rounded-2xl">
                                <Gift size={24} />
                            </div>
                            <h3 className="text-xl font-black">Parrainage</h3>
                        </div>
                        <p className="text-white/80 text-sm font-bold leading-relaxed mb-6">
                            Gagnez <span className="text-white">5,000 FCFA</span> pour chaque nouveau vendeur parrainé.
                        </p>
                        <div className="bg-white/10 border border-white/20 p-4 rounded-2xl mb-4 text-center">
                            <code className="text-xs font-black tracking-widest opacity-60">CODE: SONIA-2025</code>
                        </div>
                        <button className="w-full bg-white text-boutique-orange py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all">
                            Copier le lien
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
