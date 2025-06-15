import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TaskSkeleton } from "@/components/ui/Skeleton";
import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";
import { useTasks } from "@/hooks/useTasks";
import { useUsers } from "@/hooks/useUsers";
import { Plus, Filter, Search } from "lucide-react";
import type { Task } from "@/types";

export function TaskList() {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    filterTasks,
    clearError,
  } = useTasks();

  const { users } = useUsers();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");

  // Filtrer les tâches localement
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || task.status === statusFilter;
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    const matchesUser = !userFilter || task.assignedUserId === userFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesUser;
  });

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

  const applyFilters = async () => {
    const filters: Partial<Task> = {};
    if (statusFilter) filters.status = statusFilter as Task["status"];
    if (priorityFilter) filters.priority = priorityFilter as Task["priority"];
    if (userFilter) filters.assignedUserId = userFilter as Task["assignedUserId"];

    try {
      await filterTasks(filters);
    } catch (error) {
      console.error("Erreur lors du filtrage:", error);
    }
  };

  const clearFilters = () => {
    setStatusFilter("");
    setPriorityFilter("");
    setUserFilter("");
    setSearchTerm("");
    filterTasks({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Tâches</h1>
          <p className="text-muted-foreground">
            {filteredTasks.length} tâche{filteredTasks.length > 1 ? "s" : ""}
            {filteredTasks.length !== tasks.length && ` sur ${tasks.length}`}
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus size={16} className="mr-2" />
          Nouvelle tâche
        </Button>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-card p-4 rounded-lg border space-y-4">
        <div className="flex items-center gap-2">
          <Filter size={16} />
          <h3 className="font-medium">Filtres et recherche</h3>
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
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Filtres */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="En cours">En cours</option>
            <option value="Terminée">Terminée</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Toutes les priorités</option>
            <option value="Haute">Haute</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>

          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Tous les utilisateurs</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={applyFilters}>
              Appliquer
            </Button>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Réinitialiser
            </Button>
          </div>
        </div>
      </div>

      {/* Messages d'erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <Button variant="ghost" size="sm" onClick={clearError}>
              Fermer
            </Button>
          </div>
        </div>
      )}

      {/* Liste des tâches */}
      <div className="space-y-4">
        {loading ? (
          // Skeleton pendant le chargement
          Array.from({ length: 3 }).map((_, index) => (
            <TaskSkeleton key={index} />
          ))
        ) : filteredTasks.length === 0 ? (
          // Message quand aucune tâche
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              Aucune tâche trouvée
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter || priorityFilter || userFilter
                ? "Essayez de modifier vos critères de recherche"
                : "Commencez par créer votre première tâche"}
            </p>
            {!searchTerm && !statusFilter && !priorityFilter && !userFilter && (
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus size={16} className="mr-2" />
                Créer une tâche
              </Button>
            )}
          </div>
        ) : (
          // Liste des tâches
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
              onEdit={openEditModal}
            />
          ))
        )}
      </div>

      {/* Modal de création */}
      <Modal
        isOpen={showCreateModal}
        onClose={closeModals}
        title="Nouvelle tâche"
        size="lg"
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
        title="Modifier la tâche"
        size="lg"
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
