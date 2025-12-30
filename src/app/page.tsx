'use client'

import Image from 'next/image'
import { ArrowRight, ShoppingBag, Smartphone, Package, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const metrics = [
  { label: 'Boutiques Actives', value: '1,200+' },
  { label: 'Commandes / J', value: '5,000+' },
  { label: 'Paiements Sécurisés', value: '100%' },
]

const benefits = [
  {
    icon: <Smartphone className="text-boutique-primary" />,
    title: "Vendez Partout",
    description: "Votre boutique est optimisée pour mobile, tablette et ordinateur."
  },
  {
    icon: <Users className="text-boutique-primary" />,
    title: "Mobile Money",
    description: "Acceptez Orange, MTN, MoMo et Wave sans complications."
  },
  {
    icon: <Package className="text-boutique-primary" />,
    title: "Livraison Suivie",
    description: "Générez des codes de suivi et suivez vos colis en temps réel."
  }
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-4 py-2 bg-boutique-primary/10 rounded-full text-boutique-primary text-sm font-bold mb-6"
              >
                🚀 #1 E-commerce en Côte d'Ivoire
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-extrabold text-boutique-dark leading-tight"
              >
                Votre Boutique en Ligne en <span className="gradient-text">5 Minutes</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-500 mt-8 max-w-2xl mx-auto lg:mx-0"
              >
                Plus besoin d'être un expert technique. Vendez vos produits avec paiements Mobile Money et livraison suivie partout en Côte d'Ivoire.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  href="/boutique/dashboard"
                  className="bg-boutique-primary text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-boutique-primary/90 transition-all shadow-xl hover:shadow-boutique-primary/20 flex items-center justify-center gap-2 group"
                >
                  Démarrer Gratuitement
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/boutique/sonia-fashion"
                  className="bg-white border-2 border-gray-100 text-boutique-dark px-8 py-5 rounded-2xl font-bold text-lg hover:border-boutique-primary/30 transition-all flex items-center justify-center"
                >
                  Voir des Exemples
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex items-center justify-center lg:justify-start gap-8"
              >
                {metrics.map((m, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-boutique-dark">{m.value}</div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">{m.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex-1 relative"
            >
              <div className="relative z-10 w-full max-w-[600px] mx-auto">
                <div className="absolute -inset-4 bg-boutique-primary/20 blur-3xl rounded-full" />
                <div className="relative bg-white p-1 rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden transform hover:-rotate-1 transition-transform">
                  <Image
                    src="/hero-final.png"
                    alt="BoutiquePro.ci - La solution e-commerce en Côte d'Ivoire"
                    width={600}
                    height={600}
                    className="rounded-[2.2rem] object-cover w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-boutique-dark">Pourquoi choisir BoutiquePro.ci ?</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">Tout ce dont vous avez besoin pour faire passer votre boutique locale au niveau supérieur.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-boutique-primary/10 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-boutique-dark mb-4">{benefit.title}</h3>
                <p className="text-gray-500 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="bg-boutique-dark rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-boutique-primary opacity-20 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-boutique-secondary opacity-20 blur-[100px]" />

            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 relative z-10">
              Prêt à multiplier vos ventes ?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto relative z-10">
              Inscrivez-vous aujourd'hui et obtenez 14 jours d'essai gratuit sur notre forfait <strong>Pro</strong>.
            </p>
            <Link
              href="/boutique/dashboard"
              className="bg-boutique-primary text-white px-12 py-6 rounded-2xl font-bold text-xl inline-flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-boutique-primary/20 relative z-10"
            >
              Créer Ma Boutique Maintenant
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
