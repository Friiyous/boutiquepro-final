'use client'

import React from 'react'
import { useActionState } from 'react'
import { createProduct } from '@/app/actions/products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Loader2 } from 'lucide-react'

export function ProductForm({ onSuccess }: { onSuccess?: () => void }) {
    const [state, action, isPending] = useActionState(createProduct, null)

    React.useEffect(() => {
        if (state?.success) {
            onSuccess?.()
        }
    }, [state, onSuccess])

    return (
        <form action={action} className="space-y-6">
            {state?.error && typeof state.error === 'string' && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-center gap-2 border border-red-100">
                    <AlertCircle size={18} />
                    {state.error}
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="nom">Nom du produit</Label>
                <Input name="nom" id="nom" placeholder="ex: Robe en soie" className="rounded-xl" required />
                {state?.error && typeof state.error !== 'string' && state.error.nom && <p className="text-red-500 text-[10px] font-bold">{state.error.nom}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input name="description" id="description" placeholder="Description détaillée..." className="rounded-xl" required />
                {state?.error && typeof state.error !== 'string' && state.error.description && <p className="text-red-500 text-[10px] font-bold">{state.error.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="prix">Prix (FCFA)</Label>
                    <Input name="prix" id="prix" type="number" placeholder="5000" className="rounded-xl" required />
                    {state?.error && typeof state.error !== 'string' && state.error.prix && <p className="text-red-500 text-[10px] font-bold">{state.error.prix}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input name="stock" id="stock" type="number" placeholder="10" className="rounded-xl" required />
                    {state?.error && typeof state.error !== 'string' && state.error.stock && <p className="text-red-500 text-[10px] font-bold">{state.error.stock}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="categorie">Catégorie</Label>
                <select name="categorie" id="categorie" className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 focus:ring-2 focus:ring-boutique-orange/20 outline-none text-sm h-10">
                    <option value="Mode">Mode</option>
                    <option value="Electro">Électronique</option>
                    <option value="Maison">Maison</option>
                </select>
                {state?.error && typeof state.error !== 'string' && state.error.categorie && <p className="text-red-500 text-[10px] font-bold">{state.error.categorie}</p>}
            </div>

            <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-boutique-orange hover:bg-boutique-orange/90 text-white py-6 rounded-xl font-bold transition-all"
            >
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Traitement...
                    </>
                ) : 'Ajouter le produit'}
            </Button>
        </form>
    )
}
