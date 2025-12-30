import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
    id: string
    nom: string
    prix: number
    image: string
    quantite: number
    boutiqueId: string
}

interface CartStore {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    updateQuantite: (id: string, quantite: number) => void
    clearCart: () => void
    total: () => number
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const items = get().items
                const existingItem = items.find((i) => i.id === item.id)
                if (existingItem) {
                    set({
                        items: items.map((i) =>
                            i.id === item.id ? { ...i, quantite: i.quantite + 1 } : i
                        ),
                    })
                } else {
                    set({ items: [...items, { ...item, quantite: 1 }] })
                }
            },
            removeItem: (id) =>
                set({ items: get().items.filter((i) => i.id !== id) }),
            updateQuantite: (id, quantite) =>
                set({
                    items: get().items.map((i) =>
                        i.id === id ? { ...i, quantite: Math.max(1, quantite) } : i
                    ),
                }),
            clearCart: () => set({ items: [] }),
            total: () =>
                get().items.reduce((acc, item) => acc + item.prix * item.quantite, 0),
        }),
        {
            name: 'boutiquepro-cart',
        }
    )
)
