import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "@/components/ui/Button";
import type { Task } from "@/types";

export function ApiTest() {
  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    createTask,
    updateTask,
    deleteTask,
    filterTasks,
    clearError: clearTasksError,
    refreshTasks,
  } = useTasks();

  const {
    users,
    loading: usersLoading,
    error: usersError,
    getUserById,
    clearError: clearUsersError,
  } = useUsers();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedPriority, setSelectedPriority] =
    useState<Task["priority"]>("Moyenne");

  const handleCreateTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      await createTask({
        title: newTaskTitle,
        description: "Tâche créée depuis l'interface de test",
        priority: selectedPriority,
        status: "En attente",
        assignedUserId: users[0]?.id || "1",
      });
      setNewTaskTitle("");
    } catch (error) {
      console.error("Erreur lors de la création:", error);
    }
  };

  const handleUpdateTask = async (taskId: string) => {
    try {
      await updateTask(taskId, {
        status: "Terminée",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const handleFilterByStatus = async (status: Task["status"]) => {
    try {
      await filterTasks({ status });
    } catch (error) {
      console.error("Erreur lors du filtrage:", error);
    }
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "Haute":
        return "text-red-600";
      case "Moyenne":
        return "text-yellow-600";
      case "Basse":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "En attente":
        return "bg-yellow-100 text-yellow-800";
      case "En cours":
        return "bg-blue-100 text-blue-800";
      case "Terminée":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Test Backend Fictif</h3>

        {/* Section utilisateurs */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Utilisateurs ({users.length})</h4>
          {usersLoading && (
            <p className="text-muted-foreground">
              Chargement des utilisateurs...
            </p>
          )}
          {usersError && (
            <div className="text-red-600 mb-2">
              Erreur: {usersError}
              <Button variant="ghost" size="sm" onClick={clearUsersError}>
                Effacer
              </Button>
            </div>
          )}
          <div className="flex gap-2 flex-wrap">
            {users.map((user) => (
              <div key={user.id} className="bg-secondary p-2 rounded text-sm">
                {user.name}
              </div>
            ))}
          </div>
        </div>

        {/* Section création de tâches */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Créer une nouvelle tâche</h4>
          <div className="flex gap-2 flex-wrap items-center">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Titre de la tâche"
              className="px-3 py-2 border rounded"
            />
            <select
              value={selectedPriority}
              onChange={(e) =>
                setSelectedPriority(e.target.value as Task["priority"])
              }
              className="px-3 py-2 border rounded"
            >
              <option value="Haute">Haute</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>
            <Button
              onClick={handleCreateTask}
              disabled={!newTaskTitle.trim() || tasksLoading}
            >
              Créer
            </Button>
          </div>
        </div>

        {/* Section filtres */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Filtres</h4>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={refreshTasks}>
              Toutes les tâches
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterByStatus("En attente")}
            >
              En attente
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterByStatus("En cours")}
            >
              En cours
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterByStatus("Terminée")}
            >
              Terminées
            </Button>
          </div>
        </div>

        {/* Section tâches */}
        <div>
          <h4 className="font-medium mb-2">Tâches ({tasks.length})</h4>
          {tasksLoading && (
            <p className="text-muted-foreground">Chargement des tâches...</p>
          )}
          {tasksError && (
            <div className="text-red-600 mb-2">
              Erreur: {tasksError}
              <Button variant="ghost" size="sm" onClick={clearTasksError}>
                Effacer
              </Button>
            </div>
          )}

          <div className="space-y-2">
            {tasks.map((task) => {
              const assignedUser = getUserById(task.assignedUserId);
              return (
                <div key={task.id} className="bg-secondary p-3 rounded border">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="font-medium">{task.title}</h5>
                      <p className="text-sm text-muted-foreground">
                        {task.description}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span
                          className={`text-sm font-medium ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Assigné à: {assignedUser?.name || "Inconnu"}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {task.status !== "Terminée" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateTask(task.id)}
                        >
                          Terminer
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
