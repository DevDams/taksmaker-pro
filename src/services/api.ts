// import type { Task, User, TaskFilters } from '@/types'

import type { Task } from "@/types"

const API_BASE_URL = '/api'

// Fonction simple pour les requêtes
async function apiCall(url: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.error || `Erreur ${response.status}`)
    }

    if (response.status === 204) return null
    return await response.json()
}

// Services simplifiés
export const TaskService = {
    async getTasks(filters: Partial<Task> = {}) {
        const params = new URLSearchParams()
        if (filters.status) params.append('status', filters.status)
        if (filters.priority) params.append('priority', filters.priority)
        if (filters.assignedUserId) params.append('assignedUserId', filters.assignedUserId)

        const query = params.toString()
        return await apiCall(query ? `/tasks?${query}` : '/tasks')
    },

    async getTask(id: string) {
        return await apiCall(`/tasks/${id}`)
    },

    async createTask(data: Task) {
        return await apiCall('/tasks', {
            method: 'POST',
            body: JSON.stringify(data),
        })
    },

    async updateTask(id: string, data: Task) {
        return await apiCall(`/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    },

    async deleteTask(id: string) {
        return await apiCall(`/tasks/${id}`, { method: 'DELETE' })
    },
}

export const UserService = {
    async getUsers() {
        return await apiCall('/users')
    },

    async getUser(id: string) {
        return await apiCall(`/users/${id}`)
    },
}

// Service combiné pour faciliter l'utilisation
export const ApiService = {
    tasks: TaskService,
    users: UserService,
} 