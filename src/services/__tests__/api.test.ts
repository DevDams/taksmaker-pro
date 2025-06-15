import { describe, it, expect, vi, beforeEach } from "vitest";
import { TaskService, UserService } from "../api";

// Mock simple de fetch pour les tests
global.fetch = vi.fn();

describe("API Services", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("TaskService", () => {
        it("should have all task methods", () => {
            expect(TaskService.getTasks).toBeDefined();
            expect(TaskService.createTask).toBeDefined();
            expect(TaskService.updateTask).toBeDefined();
            expect(TaskService.deleteTask).toBeDefined();
        });

        it("should call correct endpoint for getTasks", async () => {
            const mockTasks = [{ id: "1", title: "Test" }];
            (fetch as any).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockTasks),
            });

            await TaskService.getTasks();
            expect(fetch).toHaveBeenCalledWith("/api/tasks", expect.any(Object));
        });
    });

    describe("UserService", () => {
        it("should have all user methods", () => {
            expect(UserService.getUsers).toBeDefined();
            expect(UserService.getUser).toBeDefined();
        });

        it("should call correct endpoint for getUsers", async () => {
            const mockUsers = [{ id: "1", name: "Test User" }];
            (fetch as any).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockUsers),
            });

            await UserService.getUsers();
            expect(fetch).toHaveBeenCalledWith("/api/users", expect.any(Object));
        });
    });
}); 