import { useState, useEffect, useCallback } from 'react'
import { UserService } from '@/services/api'
import type { User } from '@/types'

export function useUsers() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Charger les utilisateurs
    const loadUsers = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const data = await UserService.getUsers()
            setUsers(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    // Rafraîchir les utilisateurs
    const refreshUsers = useCallback(async () => {
        await loadUsers()
    }, [loadUsers])

    // Récupérer un utilisateur par ID
    const getUserById = useCallback((id: string) => {
        return users.find(user => user.id === id)
    }, [users])

    // Effacer l'erreur
    const clearError = useCallback(() => {
        setError(null)
    }, [])

    // Charger les utilisateurs au montage
    useEffect(() => {
        loadUsers()
    }, [loadUsers])

    return {
        users,
        loading,
        error,
        refreshUsers,
        getUserById,
        clearError,
    }
} 