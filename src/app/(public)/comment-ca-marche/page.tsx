'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Rocket, ShieldCheck, CreditCard, Truck, ArrowRight, CheckCircle2 } from 'lucide-react'

const STEPS = [
    {
        icon: <Rocket className="text-boutique-primary" size={32} />,
        title: "Créez votre boutique",
        description: "Choisissez votre nom, uploadez votre logo et commencez à ajouter vos produits en moins de 5 minutes."
    },
    {
        icon: <CreditCard className="text-boutique-accent" size={32} />,
        title: "Paiements Mobile Money",
        description: "Vos clients paient par Orange Money, MTN MoMo ou Wave. L'argent arrive directement sur votre compte."
    },
    {
        icon: <Truck className="text-boutique-secondary" size={32} />,
        title: "Livraison Simplifiée",
        description: "Générez des bordereaux de livraison et suivez vos colis en temps réel avec nos partenaires logistiques."
    },
    {
        icon: <ShieldCheck className="text-green-500" size={32} />,
        title: "Vendez en Confiance",
        description: "BoutiquePro sécurise les transactions et vous offre un support dédié pour faire croître votre business."
    }
]

export default function HowItWorks() {
    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Hero Section */}
            <section className="bg-boutique-dark py-24 px-4 md:px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-boutique-primary/10 blur-[120px] rounded-full" />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-7xl font-black text-white"
                    >
                        Digitalisez votre <span className="text-boutique-primary">Business</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 mt-8 max-w-3xl mx-auto leading-relaxed"
                    >
                        La solution e-commerce #1 conçue spécifiquement pour les commerçants de Côte d'Ivoire. Simple, Rapide, Efficace.
                    </motion.p>
                </div>
            </section>

            {/* Steps Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STEPS.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 + 0.2 }}
                            className="bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-50 text-center flex flex-col items-center group hover:scale-105 transition-all"
                        >
                            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-boutique-primary/5 transition-colors">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-boutique-dark mb-4">{step.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Why Choose Us */}
            <section className="mt-40 max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl font-black text-boutique-dark leading-tight">
                            Pourquoi choisir <br /> <span className="gradient-text">BoutiquePro.ci</span> ?
                        </h2>
                        <div className="mt-12 space-y-6">
                            {[
                                "Zéro compétence technique requise",
                                "Gestion de stock intelligente",
                                "Paiements Mobile Money intégrés",
                                "Tableau de bord de ventes complet",
                                "Support WhatsApp 7j/7"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-lg font-bold text-gray-600">
                                    <CheckCircle2 className="text-boutique-accent flex-shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/register"
                            className="mt-12 inline-flex items-center gap-3 bg-boutique-primary text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-boutique-primary/20 hover:scale-105 transition-all"
                        >
                            Démarrer Maintenant
                            <ArrowRight size={24} />
                        </Link>
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute inset-0 bg-boutique-secondary/5 rounded-full blur-[100px]" />
                        <div className="relative bg-gray-100 aspect-square rounded-[4rem] overflow-hidden border-8 border-gray-50 shadow-2xl">
                            {/* Illustration Placeholder or Styled Visual */}
                            <div className="absolute inset-0 flex items-center justify-center p-12">
                                <div className="w-full h-full bg-white rounded-3xl shadow-lg p-8">
                                    <div className="h-4 w-1/2 bg-gray-100 rounded-full mb-8" />
                                    <div className="space-y-4">
                                        <div className="h-2 w-full bg-gray-50 rounded-full" />
                                        <div className="h-2 w-full bg-gray-50 rounded-full" />
                                        <div className="h-2 w-3/4 bg-gray-50 rounded-full" />
                                    </div>
                                    <div className="mt-12 grid grid-cols-2 gap-4">
                                        <div className="h-20 bg-boutique-primary/5 rounded-2xl" />
                                        <div className="h-20 bg-boutique-accent/5 rounded-2xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
