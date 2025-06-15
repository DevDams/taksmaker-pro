import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useUsers } from "@/hooks/useUsers";
import type { Task } from "@/types";

interface TaskFormProps {
  onSubmit: (data: Task) => Promise<void>;
  onCancel: () => void;
  initialData?: Task;
  isLoading?: boolean;
}

export function TaskForm({
  onSubmit,
  onCancel,
  initialData,
  isLoading,
}: TaskFormProps) {
  const { users } = useUsers();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Moyenne",
    status: "En attente",
    assignedUserId: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else if (users.length > 0) {
      setFormData((prev) => ({ ...prev, assignedUserId: users[0].id }));
    }
  }, [initialData, users]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      await onSubmit(formData as Task);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {/* Titre */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Titre de la tâche *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full px-3 py-2 bg-neutral-100 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Entrez le titre de la tâche"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-neutral-100 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Décrivez la tâche..."
        />
      </div>

      {/* Priorité et Statut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Priorité</label>
          <select
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
            className="w-full px-3 py-2 bg-neutral-100 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Statut</label>
          <select
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full px-3 py-2 bg-neutral-100 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="En attente">En attente</option>
            <option value="En cours">En cours</option>
            <option value="Terminée">Terminée</option>
          </select>
        </div>
      </div>

      {/* Utilisateur assigné */}
      <div>
        <label className="block text-sm font-medium mb-1">Assigné à</label>
        <select
          value={formData.assignedUserId}
          onChange={(e) => handleChange("assignedUserId", e.target.value)}
          className="w-full px-3 py-2 bg-neutral-100 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Annuler
        </Button>
        <Button type="submit" disabled={!formData.title.trim() || isLoading}>
          {isLoading ? "Enregistrement..." : initialData ? "Modifier" : "Créer"}
        </Button>
      </div>
    </form>
  );
}
