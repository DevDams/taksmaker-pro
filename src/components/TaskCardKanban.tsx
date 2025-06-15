import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ConfirmationModal } from "./ConfirmationModal";
import { useUsers } from "@/hooks/useUsers";
import {
  Trash2,
  User,
  Calendar,
  Clock,
  Pen,
  Loader2,
} from "lucide-react";

interface TaskCardKanbanProps {
  task: any;
  onUpdate: (id: string, data: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (task: any) => void;
}

export function TaskCardKanban({
  task,
  onUpdate,
  onDelete,
  onEdit,
}: TaskCardKanbanProps) {
  const { getUserById } = useUsers();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const assignedUser = getUserById(task.assignedUserId);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Haute":
        return "bg-red-100 text-red-700 border-red-200";
      case "Moyenne":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Basse":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleStatusChange = async () => {
    let newStatus;
    if (task.status === "En attente") {
      newStatus = "En cours";
    } else if (task.status === "En cours") {
      newStatus = "Terminée";
    } else {
      newStatus = "En attente";
    }

    setIsUpdating(true);
    try {
      await onUpdate(task.id, { status: newStatus });
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    } finally {
      setIsUpdating(false);
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
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getNextStatusLabel = () => {
    switch (task.status) {
      case "En attente":
        return "Démarrer";
      case "En cours":
        return "Terminer";
      case "Terminée":
        return "Rouvrir";
      default:
        return "Changer";
    }
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
          isUpdating ? "opacity-70 pointer-events-none" : ""
        }`}
        onClick={() => !isUpdating && setIsExpanded(!isExpanded)}
      >
        {/* Header de la carte */}
        <div className="p-3">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-sm leading-5 line-clamp-2">
              {task.title}
            </h4>
            {isUpdating && (
              <div className="flex items-center justify-center">
                <Loader2 size={16} className="animate-spin text-blue-500" />
              </div>
            )}
          </div>

          {/* Priorité */}
          <div className="mb-3">
            <span
              className={`inline-flex items-center px-2 py-px rounded text-xs font-normal border ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>

          {/* Métadonnées compactes */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-7 h-7 flex items-center justify-center bg-neutral-100 rounded-full">
                <User size={12} />
              </div>
              <span className="truncate max-w-20 font-medium">
                {assignedUser?.name || "Non assigné"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{formatDate(task.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Contenu étendu */}
        {isExpanded && (
          <div className="border-t border-gray-100 p-3 space-y-3">
            {/* Description */}
            {task.description && (
              <p className="text-sm text-muted-foreground leading-5">
                {task.description}
              </p>
            )}

            {/* Date de modification */}
            {task.updatedAt !== task.createdAt && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} />
                <span>Modifié le {formatDate(task.updatedAt)}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(task)}
                disabled={isUpdating}
                className="flex-1 text-xs cursor-pointer"
              >
                <Pen size={12} className="mr-1" />
                Modifier
              </Button>

              <Button
                variant={task.status === "Terminée" ? "secondary" : "success"}
                size="sm"
                onClick={handleStatusChange}
                disabled={isUpdating}
                className="flex-1 text-xs cursor-pointer"
              >
                {isUpdating ? (
                  <div className="flex items-center gap-1">
                    <Loader2 size={12} className="animate-spin" />
                    <span>Mise à jour...</span>
                  </div>
                ) : (
                  getNextStatusLabel()
                )}
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDeleteModal(true)}
                disabled={isUpdating}
                className="w-8 h-8 p-0 cursor-pointer"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        )}
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
