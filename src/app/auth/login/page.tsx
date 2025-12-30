'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Store, ArrowRight, Mail, Lock, Smartphone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/auth-provider'
import { login } from '@/app/actions/auth'
import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
    const router = useRouter()
    const { loginWithDemo } = useAuth()
    const [state, action, isPending] = useActionState(login, null)

    const handleDemoLogin = () => {
        loginWithDemo()
        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
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
                    <h1 className="text-3xl font-extrabold text-boutique-dark">Bon retour !</h1>
                    <p className="text-gray-500 mt-2">Connectez-vous pour gérer votre boutique.</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
                    {state?.error && typeof state.error === 'string' && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
                            ⚠️ {state.error}
                        </div>
                    )}

                    <form action={action} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <Input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="votre@email.com"
                                    className="pl-12 bg-gray-50 border-none rounded-2xl py-7 h-auto focus-visible:ring-2 focus-visible:ring-boutique-orange/20"
                                />
                                {state?.error && typeof state.error !== 'string' && state.error.email && (
                                    <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{state.error.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-gray-700">Mot de passe</label>
                                <Link href="#" className="text-xs font-bold text-boutique-orange hover:underline">Oublié ?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <Input
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="pl-12 bg-gray-50 border-none rounded-2xl py-7 h-auto focus-visible:ring-2 focus-visible:ring-boutique-orange/20"
                                />
                                {state?.error && typeof state.error !== 'string' && state.error.password && (
                                    <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{state.error.password}</p>
                                )}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-boutique-orange text-white py-8 rounded-2xl font-black text-lg shadow-xl shadow-boutique-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isPending ? 'Connexion en cours...' : 'Se Connecter'}
                            <ArrowRight size={20} />
                        </Button>
                    </form>

                    <div className="relative my-8 text-center text-sm text-gray-400 font-medium">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                        <span className="relative bg-white px-4">OU ACCÈS RAPIDE</span>
                    </div>

                    <button
                        type="button"
                        onClick={handleDemoLogin}
                        className="w-full bg-boutique-dark text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-boutique-dark/90 transition-all shadow-lg active:scale-95"
                    >
                        <Smartphone size={20} className="text-boutique-orange" />
                        Accéder à la Démo (Sans Login)
                    </button>
                </div>

                <p className="text-center mt-8 text-gray-500 font-medium">
                    Nouveau ici ?{' '}
                    <Link href="/auth/register" className="text-boutique-orange font-bold hover:underline">
                        Créer ma boutique
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}
