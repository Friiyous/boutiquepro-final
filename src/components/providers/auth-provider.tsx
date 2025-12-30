'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Session, User } from '@supabase/supabase-js'

interface AuthContextType {
    session: Session | null
    user: User | null
    isLoading: boolean
    signOut: () => Promise<void>
    loginWithDemo: () => void
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    isLoading: true,
    signOut: async () => { },
    loginWithDemo: () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        const initializeAuth = async () => {
            // Check for demo session first
            const demoUserJson = localStorage.getItem('boutique-pro-demo')
            if (demoUserJson) {
                try {
                    const mockUser = JSON.parse(demoUserJson) as User
                    if (isMounted) {
                        setUser(mockUser)
                        setSession({ user: mockUser } as Session)
                        setIsLoading(false)
                    }
                    return
                } catch (e) {
                    localStorage.removeItem('boutique-pro-demo')
                }
            }

            // Fallback to Supabase
            const { data: { session: initialSession } } = await supabase.auth.getSession()
            if (isMounted) {
                setSession(initialSession)
                setUser(initialSession?.user ?? null)
                setIsLoading(false)
            }
        }

        initializeAuth()

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (isMounted) {
                setSession(session)
                setUser(session?.user ?? null)
                setIsLoading(false)
            }
        })

        return () => {
            isMounted = false
            subscription.unsubscribe()
        }
    }, [])

    const loginWithDemo = () => {
        const mockUser = {
            id: 'demo-sonia',
            email: 'sonia@fashion.ci',
            user_metadata: { full_name: 'Sonia Fashion' },
            app_metadata: {},
            aud: 'authenticated',
            created_at: new Date().toISOString()
        } as User

        setSession({ user: mockUser } as Session)
        setUser(mockUser)
        localStorage.setItem('boutique-pro-demo', JSON.stringify(mockUser))
    }

    const signOut = async () => {
        localStorage.removeItem('boutique-pro-demo')
        await supabase.auth.signOut()
        setSession(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ session, user, isLoading, signOut, loginWithDemo }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
