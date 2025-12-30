'use client'

import React, { useState, useActionState, useEffect } from 'react'
import { useCart } from '@/lib/store'
import { formatFCFA } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, MapPin, CreditCard, CheckCircle2, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { processCheckout } from '@/app/actions/orders'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart()
    const [step, setStep] = useState(1)
    const [provider, setProvider] = useState<string | null>(null)
    const [city, setCity] = useState('Abidjan')
    const [state, action, isPending] = useActionState(processCheckout, null)

    useEffect(() => {
        if (state?.success) {
            setStep(3)
        }
    }, [state])

    const handleNext = () => setStep(step + 1)
    const handleBack = () => setStep(step - 1)

    if (items.length === 0 && step < 3) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-gray-50">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl shadow-gray-200/50 text-center max-w-md w-full">
                    <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
                        <ShoppingBag size={48} />
                    </div>
                    <h1 className="text-3xl font-black text-boutique-dark mb-4">Panier Vide</h1>
                    <p className="text-gray-500 mb-10">Vous n&apos;avez pas encore d&apos;articles dans votre panier.</p>
                    <Button asChild className="w-full bg-boutique-orange py-7 rounded-2xl font-black text-lg shadow-xl shadow-boutique-orange/20">
                        <Link href="/boutiques">Explorer les boutiques</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const shippingFee = city === 'Abidjan' ? 2000 : city === 'Korhogo' || city === 'San Pedro' ? 7000 : 5000
    const finalTotal = total() + shippingFee

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 -mt-10">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="flex-1 w-full">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/30">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="bg-boutique-orange/10 p-3 rounded-2xl text-boutique-orange">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-boutique-dark">Livraison</h2>
                                            <p className="text-gray-400 text-sm font-bold">Où devons-nous livrer ?</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="ml-2 font-bold text-gray-700">Nom Complet</Label>
                                                <Input name="fullName" placeholder="ex: Jean Kouassi" className="bg-gray-50 border-none rounded-2xl py-7 h-auto focus-visible:ring-boutique-orange/20" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="ml-2 font-bold text-gray-700">Téléphone</Label>
                                                <Input name="phone" type="tel" placeholder="07 00 00 00 00" className="bg-gray-50 border-none rounded-2xl py-7 h-auto focus-visible:ring-boutique-orange/20" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="ml-2 font-bold text-gray-700">Ville de livraison</Label>
                                            <select
                                                name="city"
                                                onChange={(e) => setCity(e.target.value)}
                                                className="w-full bg-gray-50 border-none rounded-2xl p-4 h-16 focus:ring-2 focus:ring-boutique-orange/20 outline-none text-sm font-bold"
                                            >
                                                <option value="Abidjan">Abidjan (2 000 FCFA)</option>
                                                <option value="Bouake">Bouaké (5 000 FCFA)</option>
                                                <option value="Yamoussoukro">Yamoussoukro (5 000 FCFA)</option>
                                                <option value="Korhogo">Korhogo (7 000 FCFA)</option>
                                                <option value="San Pedro">San Pedro (7 000 FCFA)</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="ml-2 font-bold text-gray-700">Adresse détaillée</Label>
                                            <Input name="address" placeholder="Quartier, Rue, Infos supplémentaires..." className="bg-gray-50 border-none rounded-2xl py-7 h-auto focus-visible:ring-boutique-orange/20" />
                                        </div>
                                    </div>
                                </div>
                                <Button onClick={handleNext} className="w-full mt-8 bg-boutique-orange py-8 rounded-[2rem] font-black text-lg shadow-xl shadow-boutique-orange/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                                    Suivant
                                    <ChevronRight size={20} />
                                </Button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                <form action={action}>
                                    {/* Hidden fields for server action */}
                                    <input type="hidden" name="fullName" value={(document.querySelector('input[name="fullName"]') as any)?.value} />
                                    <input type="hidden" name="phone" value={(document.querySelector('input[name="phone"]') as any)?.value} />
                                    <input type="hidden" name="address" value={city + ' - ' + (document.querySelector('input[name="address"]') as any)?.value} />
                                    <input type="hidden" name="total" value={finalTotal} />
                                    <input type="hidden" name="items" value={JSON.stringify(items)} />

                                    <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/30">
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="bg-boutique-orange/10 p-3 rounded-2xl text-boutique-orange">
                                                <CreditCard size={24} />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-black text-boutique-dark">Paiement</h2>
                                                <p className="text-gray-400 text-sm font-bold">Choisissez votre moyen de paiement</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {['Orange Money', 'MTN MoMo', 'Wave', 'Moov Money'].map(p => (
                                                <button
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setProvider(p)}
                                                    className={`p-8 rounded-[2rem] border-2 transition-all text-left group ${provider === p ? 'border-boutique-orange bg-boutique-orange/5' : 'border-gray-50 bg-white hover:border-gray-200'}`}
                                                >
                                                    <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-all ${provider === p ? 'bg-boutique-orange text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                                                        <CreditCard size={24} />
                                                    </div>
                                                    <span className={`font-black text-lg ${provider === p ? 'text-boutique-dark' : 'text-gray-500'}`}>{p}</span>
                                                </button>
                                            ))}
                                        </div>

                                        {state?.error && (
                                            <div className="mt-8 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
                                                ⚠️ {typeof state.error === 'string' ? state.error : 'Veuillez vérifier vos informations'}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-4 mt-8">
                                        <Button type="button" onClick={handleBack} variant="outline" className="p-8 rounded-[2rem] border-gray-200 text-gray-400">
                                            <ArrowLeft size={24} />
                                        </Button>
                                        <Button
                                            disabled={!provider || isPending}
                                            type="submit"
                                            className="flex-1 bg-boutique-orange py-8 rounded-[2rem] font-black text-lg shadow-xl shadow-boutique-orange/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            {isPending ? <Loader2 className="animate-spin" /> : 'Confirmer le paiement'}
                                            {!isPending && <ChevronRight size={20} />}
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="s3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center bg-white p-16 rounded-[4rem] border border-gray-100 shadow-xl shadow-gray-200/30">
                                <div className="bg-boutique-orange/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-10 text-boutique-orange">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h1 className="text-4xl font-black text-boutique-dark mb-4">Commande Reçue !</h1>
                                <p className="text-gray-400 font-bold mb-12 max-w-xs mx-auto">Merci pour votre confiance. Nous préparons votre colis avec soin.</p>
                                <Button asChild onClick={() => clearCart()} className="bg-boutique-dark text-white px-12 py-8 rounded-[2rem] font-black text-lg">
                                    <Link href="/">Retour à l'accueil</Link>
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {step < 3 && (
                    <div className="w-full lg:w-[450px] sticky top-32">
                        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/30">
                            <h3 className="text-xl font-black text-boutique-dark mb-8">Détails de la commande</h3>

                            <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-50">
                                            <Image src={item.image} alt={item.nom} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-boutique-dark truncate text-sm">{item.nom}</h4>
                                            <p className="text-gray-400 text-xs font-bold">Qté: {item.quantite}</p>
                                        </div>
                                        <div className="font-bold text-sm text-boutique-dark">
                                            {formatFCFA(item.prix * item.quantite)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-8 border-t border-gray-50">
                                <div className="flex justify-between text-gray-500 font-bold text-sm">
                                    <span>Sous-total</span>
                                    <span>{formatFCFA(total())}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-bold text-sm">
                                    <span>Livraison</span>
                                    <span>{formatFCFA(shippingFee)}</span>
                                </div>
                                <div className="h-px bg-gray-50 my-2" />
                                <div className="flex justify-between items-center">
                                    <span className="text-boutique-dark font-black text-xl uppercase tracking-tighter">Total à payer</span>
                                    <span className="text-3xl font-black text-boutique-orange">{formatFCFA(finalTotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
