import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { TaskKanban } from "@/components/TaskKanban";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-neutral-100 text-foreground">
        <div className="w-full mx-auto">
          <header className="sticky top-0 z-10 bg-white flex justify-between items-center mb-8 p-4 rounded-lg drop-shadow">
            <div className="w-11/12 max-w-7xl mx-auto flex justify-between items-center">
              <div>
                <h1 className="text-2xl text-indigo-500 font-bold">
                  TaskMaster Pro
                </h1>
                <p className="text-sm text-neutral-500 font-normal">
                  Application de gestion de tâches collaboratives
                </p>
              </div>
              <ThemeSwitcher />
            </div>
          </header>

          <main className="max-w-6xl mx-auto">
            <TaskKanban />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
