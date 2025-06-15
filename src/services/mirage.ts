import { createServer, Response } from "miragejs";

// Données statiques simples
const mockUsers = [
    { id: "1", name: "Alice Dupont", email: "alice.dupont@company.com" },
    { id: "2", name: "Jean Martin", email: "jean.martin@company.com" },
    { id: "3", name: "Sophie Bernard", email: "sophie.bernard@company.com" },
];

const mockTasks = [
    {
        id: "1",
        title: "Développer la nouvelle fonctionnalité",
        description: "Implémenter le système de notifications",
        priority: "Haute",
        status: "En cours",
        assignedUserId: "1",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-16"),
    },
    {
        id: "2",
        title: "Corriger le bug de connexion",
        description: "Résoudre le problème de timeout",
        priority: "Haute",
        status: "En attente",
        assignedUserId: "2",
        createdAt: new Date("2024-01-14"),
        updatedAt: new Date("2024-01-14"),
    },
    {
        id: "3",
        title: "Mettre à jour la documentation",
        description: "Documenter les nouvelles APIs",
        priority: "Moyenne",
        status: "Terminée",
        assignedUserId: "3",
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-12"),
    },
    {
        id: "4",
        title: "Optimiser les performances",
        description: "Améliorer le temps de chargement",
        priority: "Haute",
        status: "En cours",
        assignedUserId: "1",
        createdAt: new Date("2024-01-08"),
        updatedAt: new Date("2024-01-15"),
    },
    {
        id: "5",
        title: "Revoir le design interface",
        description: "Mise à jour UX/UI selon retours",
        priority: "Moyenne",
        status: "En attente",
        assignedUserId: "2",
        createdAt: new Date("2024-01-12"),
        updatedAt: new Date("2024-01-12"),
    },
    {
        id: "6",
        title: "Tests unitaires",
        description: "Atteindre 80% de couverture",
        priority: "Moyenne",
        status: "En cours",
        assignedUserId: "3",
        createdAt: new Date("2024-01-11"),
        updatedAt: new Date("2024-01-13"),
    },
    {
        id: "7",
        title: "Configuration CI/CD",
        description: "Setup pipeline automatique",
        priority: "Basse",
        status: "Terminée",
        assignedUserId: "1",
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-09"),
    },
    {
        id: "8",
        title: "Analyser métriques",
        description: "Dashboard temps réel",
        priority: "Basse",
        status: "En attente",
        assignedUserId: "2",
        createdAt: new Date("2024-01-13"),
        updatedAt: new Date("2024-01-13"),
    },
];

export function setupMirage() {
    return createServer({
        routes() {
            this.namespace = "api";
            this.timing = 1500; // Délai réduit à 1500ms

            // Routes utilisateurs
            this.get("/users", () => mockUsers);
            this.get("/users/:id", (_, request) => {
                const user = mockUsers.find((u) => u.id === request.params.id);
                return user
                    ? user
                    : new Response(404, {}, { error: "Utilisateur non trouvé" });
            });

            // Routes tâches
            this.get("/tasks", (_, request) => {
                let tasks = [...mockTasks];
                const { status, priority, assignedUserId } = request.queryParams;

                if (status) tasks = tasks.filter((t) => t.status === status);
                if (priority) tasks = tasks.filter((t) => t.priority === priority);
                if (assignedUserId)
                    tasks = tasks.filter((t) => t.assignedUserId === assignedUserId);

                return tasks;
            });

            this.get("/tasks/:id", (_, request) => {
                const task = mockTasks.find((t) => t.id === request.params.id);
                return task
                    ? task
                    : new Response(404, {}, { error: "Tâche non trouvée" });
            });

            this.post("/tasks", (_, request) => {
                const data = JSON.parse(request.requestBody);
                const newTask = {
                    ...data,
                    id: Date.now().toString(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                mockTasks.push(newTask);
                return newTask;
            });

            this.put("/tasks/:id", (_, request) => {
                const data = JSON.parse(request.requestBody);
                const taskIndex = mockTasks.findIndex(
                    (t) => t.id === request.params.id
                );

                if (taskIndex === -1) {
                    return new Response(404, {}, { error: "Tâche non trouvée" });
                }

                mockTasks[taskIndex] = {
                    ...mockTasks[taskIndex],
                    ...data,
                    updatedAt: new Date(),
                };

                return mockTasks[taskIndex];
            });

            this.delete("/tasks/:id", (_, request) => {
                const taskIndex = mockTasks.findIndex(
                    (t) => t.id === request.params.id
                );

                if (taskIndex === -1) {
                    return new Response(404, {}, { error: "Tâche non trouvée" });
                }

                mockTasks.splice(taskIndex, 1);
                return new Response(204);
            });
        },
    });
}
