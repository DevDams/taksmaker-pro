// Types pour les tâches
export interface Task {
  id: string
  title: string
  description: string
  priority: 'Haute' | 'Moyenne' | 'Basse'
  status: 'En attente' | 'En cours' | 'Terminée'
  assignedUserId: string
  createdAt: Date
  updatedAt: Date
}

// Types pour les utilisateurs
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

// Types pour les thèmes
export type ThemeType = 'material' | 'shadcn'

// Types pour les filtres
export interface TaskFilters {
  status?: Task['status']
  priority?: Task['priority']
  assignedUserId?: string
}

// Types pour les contextes
export interface TaskContextType {
  tasks: Task[]
  loading: boolean
  error: string | null
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  filterTasks: (filters: TaskFilters) => Task[]
}

export interface ThemeContextType {
  theme: ThemeType
  toggleTheme: () => void
  setTheme: (theme: ThemeType) => void
}

export interface UserContextType {
  users: User[]
  loading: boolean
  error: string | null
} 