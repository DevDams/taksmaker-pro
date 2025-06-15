import { useState, useEffect, useCallback } from 'react'
import { TaskService } from '@/services/api'
import type { Task } from '@/types'

export function useTasks(initialFilters: Partial<Task> = {}) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Charger les tâches
    const loadTasks = useCallback(async (filters = {}) => {
        setLoading(true)
        setError(null)

        try {
            const data = await TaskService.getTasks(filters)
            setTasks(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    // Rafraîchir les tâches
    const refreshTasks = useCallback(async () => {
        await loadTasks(initialFilters)
    }, [loadTasks, initialFilters])

    // Créer une nouvelle tâche
    const createTask = useCallback(async (taskData: Task) => {
        setLoading(true)
        setError(null)

        try {
            const newTask = await TaskService.createTask(taskData)
            await loadTasks(initialFilters)
            return newTask
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [loadTasks, initialFilters])

    // Mettre à jour une tâche
    const updateTask = useCallback(async (id: string, updates: Task) => {
        setLoading(true)
        setError(null)

        try {
            const updatedTask = await TaskService.updateTask(id, updates)
            setTasks(prev => prev.map((task: Task) =>
                task.id === id ? updatedTask : task
            ))
            return updatedTask
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    // Supprimer une tâche
    const deleteTask = useCallback(async (id: string) => {
        setLoading(true)
        setError(null)

        try {
            await TaskService.deleteTask(id)
            setTasks(prev => prev.filter((task: Task) => task.id !== id))
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    // Filtrer les tâches
    const filterTasks = useCallback(async (filters: Partial<Task>) => {
        await loadTasks(filters)
    }, [loadTasks])

    // Effacer l'erreur
    const clearError = useCallback(() => {
        setError(null)
    }, [])

    // Charger les tâches au montage
    useEffect(() => {
        loadTasks(initialFilters)
    }, [])

    return {
        tasks,
        loading,
        error,
        refreshTasks,
        createTask,
        updateTask,
        deleteTask,
        filterTasks,
        clearError,
    }
} 