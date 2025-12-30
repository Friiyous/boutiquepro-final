'use client'

import { useAuth } from '@/components/providers/auth-provider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Store } from 'lucide-react'

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { session, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !session) {
            router.push('/login')
        }
    }, [session, isLoading, router])

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="bg-boutique-primary p-4 rounded-2xl text-white shadow-xl mb-6"
                >
                    <Store size={40} />
                </motion.div>
                <p className="text-gray-400 font-bold animate-pulse">Chargement sécurisé...</p>
            </div>
        )
    }

    if (!session) {
        return null
    }

    return <>{children}</>
}
