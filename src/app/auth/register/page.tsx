'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Store, User, Smartphone, MapPin, ArrowRight, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/auth-provider'
import { register } from '@/app/actions/auth'
import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function RegisterPage() {
    const router = useRouter()
    const { loginWithDemo } = useAuth()
    const [step, setStep] = useState(1)
    const [state, action, isPending] = useActionState(register, null)

    const [formData, setFormData] = useState({
        fullName: '', email: '', whatsapp: '',
        shopName: '', category: '', city: '',
        password: '', confirmPassword: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleDemoLogin = () => {
        loginWithDemo()
        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl w-full"
            >
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8">
                        <div className="bg-boutique-orange p-2 rounded-xl text-white">
                            <Store size={32} />
                        </div>
                        <span className="text-2xl font-black text-boutique-dark">
                            Boutique<span className="text-boutique-orange">Pro</span>.ci
                        </span>
                    </Link>
                    <h1 className="text-3xl font-extrabold text-boutique-dark">Ouvrez votre boutique</h1>
                    <p className="text-gray-500 mt-2">Rejoignez 1 200+ commerçants Ivoiriens.</p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
                    {state?.error && typeof state.error === 'string' && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
                            ⚠️ {state.error}
                        </div>
                    )}

                    <div className="flex gap-2 mb-10">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-boutique-orange' : 'bg-gray-100'}`}
                            />
                        ))}
                    </div>

                    <form action={action}>
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-bold text-boutique-dark">Mes Informations</h2>
                                        <div className="grid gap-4">
                                            <Input name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" placeholder="Nom complet" className="bg-gray-50 border-none rounded-2xl py-7 h-auto focus-visible:ring-2 focus-visible:ring-boutique-orange/20" />
                                            {state?.error && typeof state.error !== 'string' && state.error.fullName && <p className="text-red-500 text-[10px] font-bold ml-2">{state.error.fullName}</p>}

                                            <Input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Email" className="bg-gray-50 border-none rounded-2xl py-7 h-auto focus-visible:ring-2 focus-visible:ring-boutique-orange/20" />
                                            {state?.error && typeof state.error !== 'string' && state.error.email && <p className="text-red-500 text-[10px] font-bold ml-2">{state.error.email}</p>}

                                            <Input name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} type="tel" placeholder="Numéro WhatsApp" className="bg-gray-50 border-none rounded-2xl py-7 h-auto focus-visible:ring-2 focus-visible:ring-boutique-orange/20" />
                                            {state?.error && typeof state.error !== 'string' && state.error.whatsapp && <p className="text-red-500 text-[10px] font-bold ml-2">{state.error.whatsapp}</p>}
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="w-full bg-boutique-orange text-white py-8 rounded-2xl font-black text-lg shadow-xl shadow-boutique-orange/20 flex items-center justify-center gap-2"
                                    >
                                        Continuer
                                        <ArrowRight size={20} />
                                    </Button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-bold text-boutique-dark">Ma Boutique</h2>
                                        <div className="grid gap-4">
                                            <Input name="shopName" value={formData.shopName} onChange={handleInputChange} type="text" placeholder="Nom de la boutique" className="bg-gray-50 border-none rounded-2xl py-7 h-auto focus-visible:ring-2 focus-visible:ring-boutique-orange/20" />
                                            {state?.error && typeof state.error !== 'string' && state.error.shopName && <p className="text-red-500 text-[10px] font-bold ml-2">{state.error.shopName}</p>}

                                            <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-boutique-orange/20 outline-none text-gray-500 font-bold">
                                                <option value="">Catégorie de produits</option>
                                                <option value="Mode">Mode & Prêt-à-porter</option>
                                                <option value="Electro">Électronique</option>
                                                <option value="Maison">Maison & Déco</option>
                                            </select>
                                            {state?.error && typeof state.error !== 'string' && state.error.category && <p className="text-red-500 text-[10px] font-bold ml-2">{state.error.category}</p>}

                                            <Input name="city" value={formData.city} onChange={handleInputChange} type="text" placeholder="Ville (ex: Abidjan)" className="bg-gray-50 border-none rounded-2xl py-7 h-auto focus-visible:ring-2 focus-visible:ring-boutique-orange/20" />
                                            {state?.error && typeof state.error !== 'string' && state.error.city && <p className="text-red-500 text-[10px] font-bold ml-2">{state.error.city}</p>}
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button type="button" onClick={() => setStep(1)} variant="outline" className="p-8 bg-gray-50 text-gray-500 rounded-2xl border border-gray-100 hover:bg-gray-100">
                                            <ArrowLeft size={20} />
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => setStep(3)}
                                            className="flex-1 bg-boutique-orange text-white py-8 rounded-2xl font-black text-lg shadow-xl shadow-boutique-orange/20 flex items-center justify-center gap-2"
                                        >
                                            Presque fini
                                            <ArrowRight size={20} />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-bold text-boutique-dark">Sécurité</h2>
                                        <div className="grid gap-4">
                                            <Input name="password" value={formData.password} onChange={handleInputChange} type="password" placeholder="Mot de passe" className="bg-gray-50 border-none rounded-2xl py-7 h-auto focus-visible:ring-2 focus-visible:ring-boutique-orange/20" />
                                            {state?.error && typeof state.error !== 'string' && state.error.password && <p className="text-red-500 text-[10px] font-bold ml-2">{state.error.password}</p>}

                                            <Input name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} type="password" placeholder="Confirmer le mot de passe" className="bg-gray-50 border-none rounded-2xl py-7 h-auto focus-visible:ring-2 focus-visible:ring-boutique-orange/20" />
                                        </div>
                                        <div className="p-4 bg-boutique-orange/5 rounded-2xl border border-boutique-orange/10">
                                            <p className="text-xs text-gray-500 leading-relaxed text-center">
                                                En cliquant sur "Créer ma boutique", vous acceptez nos{' '}
                                                <Link href="#" className="font-bold text-boutique-orange">Conditions Générales</Link>.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button type="button" onClick={() => setStep(2)} variant="outline" className="p-8 bg-gray-50 text-gray-500 rounded-2xl border border-gray-100 hover:bg-gray-100">
                                            <ArrowLeft size={20} />
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isPending}
                                            className="flex-1 bg-boutique-orange text-white py-8 rounded-2xl font-black text-lg shadow-xl shadow-boutique-orange/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
                                        >
                                            {isPending ? 'Création...' : 'Créer ma boutique'}
                                            <ArrowRight size={20} />
                                        </Button>
                                    </div>

                                    <div className="relative my-4 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                                        <span className="relative bg-white px-2">Ou la solution rapide</span>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={handleDemoLogin}
                                        className="w-full bg-gray-50 text-gray-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all text-sm h-auto"
                                    >
                                        <Smartphone size={16} />
                                        Tester la Démo sans compte
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>

                <p className="text-center mt-8 text-gray-500 font-medium">
                    Déjà un compte ?{' '}
                    <Link href="/auth/login" className="text-boutique-orange font-bold hover:underline">
                        Se connecter
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}
