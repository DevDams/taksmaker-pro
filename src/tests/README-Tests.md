# Tests Unitaires - TaskMaster Pro

## 🧪 Configuration Simple

Le projet utilise **Vitest** et **React Testing Library** pour des tests simples et efficaces.

### Technologies

- **Vitest** - Framework de test
- **React Testing Library** - Tests de composants
- **@testing-library/jest-dom** - Matchers DOM

## 📁 Structure

```
src/
├── tests/
│   ├── setup.ts           # Configuration de base
│   ├── vitest.setup.ts    # Mocks simples
│   ├── test-utils.tsx     # Rendu avec ThemeProvider
│   └── integration/
│       └── App.integration.test.tsx
├── components/__tests__/
├── hooks/__tests__/
└── utils/__tests__/
```

## 📋 Tests Implémentés

### 🎨 Composants

#### `ThemeSwitcher.test.tsx`

- ✅ Rendu du composant
- ✅ Affichage de l'icône
- ✅ Support des deux thèmes

#### `ConfirmationModal.test.tsx`

- ✅ Rendu conditionnel
- ✅ Callbacks de confirmation/annulation

#### `TaskList.test.tsx`

- ✅ Rendu de la liste de tâches
- ✅ Support des deux thèmes

#### `TaskForm.test.tsx`

- ✅ Rendu du formulaire
- ✅ Présence des champs
- ✅ Support des thèmes

#### `TaskKanban.test.tsx`

- ✅ Rendu du kanban
- ✅ Support des thèmes

#### `TaskItem.test.tsx`

- ✅ Rendu d'une tâche
- ✅ Affichage des données
- ✅ Support des thèmes

### 🪝 Hooks

#### `useTheme.test.tsx`

- ✅ Thème par défaut
- ✅ Basculement de thème
- ✅ Définition de thème

#### `useTasks.test.tsx`

- ✅ Initialisation du hook
- ✅ Retour des fonctions

#### `useUsers.test.tsx`

- ✅ Initialisation du hook
- ✅ Fonction getUserById
- ✅ Retour des fonctions

### 🔧 Utilitaires

#### `helpers.test.ts`

- ✅ Formatage de date
- ✅ Troncature de texte
- ✅ Validation d'email

### 🌐 Services & API

#### `api.test.ts`

- ✅ Tests des services TaskService
- ✅ Tests des services UserService  
- ✅ Appels aux bonnes endpoints

### 🔗 Application

#### `App.integration.test.tsx`

- ✅ Rendu de l'application
- ✅ Support des thèmes
- ✅ Performance de base

## 🚀 Lancer les Tests

```bash
npm test              # Tous les tests
npm run test:coverage # Avec couverture
npm run test:ui       # Interface graphique
```

## 📝 Comment Écrire des Tests

```typescript
describe("Component", () => {
  it("should do something", () => {
    render(<Component />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

## 🎯 Bonnes Pratiques

- **Tests simples** : Une seule chose par test
- **Noms clairs** : Décrire ce qui est testé
- **Pas de mocks** complexes : Utiliser les vrais composants quand possible
- **Focus sur l'utilisateur** : Tester ce que l'utilisateur voit/fait
