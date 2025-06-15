import { useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TaskSkeleton } from "@/components/ui/Skeleton";
import { TaskForm } from "./TaskForm";
import { TaskCardKanban } from "./TaskCardKanban";
import { useTasks } from "@/hooks/useTasks";
import { useUsers } from "@/hooks/useUsers";
import { Plus, Filter, Search } from "lucide-react";
import type { Task } from "@/types";

const TASK_COLUMNS = [
  {
    id: "En attente",
    title: "En attente",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    titleColor: "text-yellow-800",
  },
  {
    id: "En cours",
    title: "En cours",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    titleColor: "text-blue-800",
  },
  {
    id: "Terminée",
    title: "Terminée",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    titleColor: "text-green-800",
  },
];

export function TaskKanban() {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    clearError,
  } = useTasks();

  const { users } = useUsers();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filtrer les tâches localement
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority =
        !priorityFilter || task.priority === priorityFilter;
      const matchesUser = !userFilter || task.assignedUserId === userFilter;

      return matchesSearch && matchesPriority && matchesUser;
    });
  }, [tasks, searchTerm, priorityFilter, userFilter]);

  // Organiser les tâches par colonne
  const tasksByColumn = useMemo(() => {
    const grouped = TASK_COLUMNS.reduce((acc, column) => {
      acc[column.id] = filteredTasks.filter(
        (task) => task.status === column.id
      );
      return acc;
    }, {} as Record<string, Task[]>);

    return grouped;
  }, [filteredTasks]);

  const handleCreateTask = async (data: Task) => {
    setIsSubmitting(true);
    try {
      await createTask(data);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Erreur lors de la création:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTask = async (data: Task) => {
    if (!editingTask) return;

    setIsSubmitting(true);
    try {
      await updateTask(editingTask.id, data);
      setShowEditModal(false);
      setEditingTask(null);
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setEditingTask(null);
  };

  const clearFilters = () => {
    setPriorityFilter("");
    setUserFilter("");
    setSearchTerm("");
  };

  return (
    <div className="pt-5 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Liste des tâches</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-2" />
            Filtres
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus size={16} className="mr-2" />
            Nouvelle tâche
          </Button>
        </div>
      </div>

      {/* Filtres collapsibles */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter size={16} />
              <h3 className="font-medium">Filtres et recherche</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => setShowFilters(false)}
            >
              Annuler
            </Button>
          </div>

          {/* Barre de recherche */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-3 text-muted-foreground"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher dans les tâches..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-100 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Filtres */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 bg-neutral-100 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Toutes les priorités</option>
              <option value="Haute">Haute</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>

            <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="px-3 py-2 bg-neutral-100 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Tous les utilisateurs</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <Button variant="outline" size="sm" onClick={clearFilters}>
              Réinitialiser
            </Button>
          </div>
        </div>
      )}

      {/* Messages d'erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer"
              onClick={clearError}
            >
              Fermer
            </Button>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <div className="h-screen max-h-[calc(100vh-12rem)] overflow-x-auto">
        <div className="flex gap-6 pb-6 min-w-max">
          {TASK_COLUMNS.map((column) => {
            const columnTasks = tasksByColumn[column.id] || [];

            return (
              <div
                key={column.id}
                className={`w-80 flex-shrink-0 ${column.bgColor} ${column.borderColor} border rounded-lg`}
              >
                {/* Header de colonne */}
                <div className="p-4 border-b border-current/10">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${column.titleColor}`}>
                      {column.title}
                    </h3>
                    <span
                      className={`text-sm px-2 py-1 rounded-full bg-white/70 ${column.titleColor}`}
                    >
                      {columnTasks.length}
                    </span>
                  </div>
                </div>

                {/* Liste des tâches avec scroll vertical */}
                <div className="p-4 h-full max-h-[calc(100vh-16rem)] overflow-y-auto">
                  <div className="space-y-3">
                    {loading && columnTasks.length === 0 ? (
                      // Skeleton pendant le chargement
                      Array.from({ length: 2 }).map((_, index) => (
                        <TaskSkeleton key={index} />
                      ))
                    ) : columnTasks.length === 0 ? (
                      // Message quand aucune tâche dans la colonne
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-sm">Aucune tâche</p>
                      </div>
                    ) : (
                      // Liste des tâches
                      columnTasks.map((task) => (
                        <TaskCardKanban
                          key={task.id}
                          task={task}
                          onUpdate={updateTask}
                          onDelete={deleteTask}
                          onEdit={openEditModal}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Message global quand aucune tâche */}
      {!loading && filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Aucune tâche trouvée
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || priorityFilter || userFilter
              ? "Essayez de modifier vos critères de recherche"
              : "Commencez par créer votre première tâche"}
          </p>
          {!searchTerm && !priorityFilter && !userFilter && (
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus size={16} className="mr-2" />
              Créer une tâche
            </Button>
          )}
        </div>
      )}

      {/* Modal de création */}
      <Modal
        isOpen={showCreateModal}
        onClose={closeModals}
        title="Créer une nouvelle tâche"
        size="sm"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={closeModals}
          isLoading={isSubmitting}
        />
      </Modal>

      {/* Modal d'édition */}
      <Modal
        isOpen={showEditModal}
        onClose={closeModals}
        title="Modifier cette tâche"
        size="sm"
      >
        <TaskForm
          onSubmit={handleEditTask}
          onCancel={closeModals}
          initialData={editingTask}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
}
