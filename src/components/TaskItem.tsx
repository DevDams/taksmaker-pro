import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ConfirmationModal } from "./ConfirmationModal";
import { useUsers } from "@/hooks/useUsers";
import { Edit, Trash2, User, Calendar, Clock } from "lucide-react";

interface TaskItemProps {
  task: any;
  onUpdate: (id: string, data: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (task: any) => void;
}

export function TaskItem({ task, onUpdate, onDelete, onEdit }: TaskItemProps) {
  const { getUserById } = useUsers();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const assignedUser = getUserById(task.assignedUserId);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Haute":
        return "text-red-600 bg-red-50 border-red-200";
      case "Moyenne":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Basse":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En attente":
        return "text-yellow-700 bg-yellow-100";
      case "En cours":
        return "text-blue-700 bg-blue-100";
      case "Terminée":
        return "text-green-700 bg-green-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const handleStatusChange = async () => {
    const newStatus = task.status === "Terminée" ? "En cours" : "Terminée";
    try {
      await onUpdate(task.id, { status: newStatus });
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("fr-FR");
  };

  return (
    <>
      <div className="bg-card p-4 rounded-lg border hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
            <p className="text-muted-foreground text-sm mb-3">
              {task.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status}
              </span>
            </div>

            {/* Métadonnées */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User size={14} />
                <span>{assignedUser?.name || "Non assigné"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Créé le {formatDate(task.createdAt)}</span>
              </div>
              {task.updatedAt !== task.createdAt && (
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>Modifié le {formatDate(task.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 ml-4">
            <Button variant="outline" size="sm" onClick={() => onEdit(task)}>
              <Edit size={16} className="mr-1" />
              Modifier
            </Button>

            <Button
              variant={task.status === "Terminée" ? "secondary" : "default"}
              size="sm"
              onClick={handleStatusChange}
            >
              {task.status === "Terminée" ? "Rouvrir" : "Terminer"}
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Supprimer la tâche"
        message={`Êtes-vous sûr de vouloir supprimer la tâche "${task.title}" ? Cette action ne peut pas être annulée.`}
        confirmText="Supprimer"
      />
    </>
  );
}
