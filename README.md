# TaskMaster Pro

## Description du Projet

TaskMaster Pro est une application frontend de gestion de tâches collaboratives de niveau entreprise, conçue pour gérer efficacement des milliers de tâches tout en garantissant des performances optimales. 

### Objectifs Principaux

- **Gestion collaborative** : Créer, modifier, supprimer et assigner des tâches à différents utilisateurs
- **Thématisation dynamique** : Basculer en temps réel entre Material UI et shadCN/UI
- **Performance** : Interface réactive capable de gérer un grand volume de données
- **Architecture moderne** : Utilisation des dernières technologies React et TypeScript

### Fonctionnalités Clés

- **CRUD complet** des tâches (Create, Read, Update, Delete)
- **Assignation** des tâches aux utilisateurs fictifs
- **Filtrage avancé** par statut, priorité et utilisateur
- **Système de thématisation** Material UI ↔ shadCN
- **Backend fictif** avec MirageJS pour simulation API
- **Interface responsive** avec Tailwind CSS v4
- **Vue Kanban** et vue liste pour la gestion des tâches

## Technologies Utilisées

- **React 19** avec TypeScript
- **Vite** comme bundler
- **Tailwind CSS v4** pour le styling
- **Material UI** pour le premier thème
- **shadCN/UI** pour le second thème
- **Lucide React** pour les icônes
- **Vitest** pour les tests
- **MirageJS** pour le backend fictif
- **Docker** pour la containerisation
- **GitHub Actions** pour CI/CD

## Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI génériques
│   └── ThemeSwitcher.tsx
├── contexts/           # Context API
│   └── ThemeContext.tsx
├── hooks/              # Hooks personnalisés
│   └── useTheme.ts
├── lib/                # Utilitaires
│   └── utils.ts
├── services/           # Services API
├── themes/             # Composants spécifiques aux thèmes
│   ├── material/       # Composants Material UI
│   └── shadcn/         # Composants shadCN
├── types/              # Types TypeScript
│   └── index.ts
├── tests/              # Tests unitaires
│   └── setup.ts
└── utils/              # Fonctions utilitaires
```

## Installation et Démarrage

### Prérequis

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **Docker** (optionnel, pour le déploiement)

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd taskmaster-pro

# Installer les dépendances
npm install

# Copier les variables d'environnement (optionnel)
cp env.example .env
```

### Développement Local

```bash
# Démarrer le serveur de développement
npm run dev
# ➜ http://localhost:5173

# Lancer les tests en mode watch
npm run test

# Lancer les tests avec couverture
npm run test:coverage

# Build de production
npm run build

# Prévisualiser le build de production
npm run preview
```

### Première Utilisation

1. **Démarrer l'application** : `npm run dev`
2. **Ouvrir le navigateur** : http://localhost:5173
3. **Tester la thématisation** : Cliquer sur le bouton de thème en haut à droite
4. **Créer des tâches** : Utiliser le formulaire pour ajouter des tâches
5. **Filtrer** : Utiliser les filtres par statut, priorité ou utilisateur

## Déploiement avec Docker

### Instructions de Déploiement

```bash
# Option 1: Avec Docker Compose (recommandé)
docker-compose up -d
# ➜ Application disponible sur http://localhost

# Option 2: Build et run manuel
docker build -t taskmaster-pro .
docker run -p 80:80 taskmaster-pro

# Vérifier le fonctionnement
curl http://localhost/health
# ➜ Devrait retourner "OK"

# Arrêter les conteneurs
docker-compose down
```

### Variables d'Environnement pour Docker

L'application supporte les variables d'environnement suivantes :

- `NODE_ENV` : Environnement d'exécution (`development` | `production`)
- `VITE_API_URL` : URL de l'API pour le frontend

## Pipeline CI/CD

### Configuration GitHub Actions

La pipeline CI/CD est configurée dans `.github/workflows/ci-cd.yml` et s'exécute automatiquement :

**Déclencheurs :**
- Push sur la branche `main`
- Pull Request vers `main`

**Étapes de la Pipeline :**

1. **Job `test`** (sur tous les push/PR)
   - Installation des dépendances avec cache npm
   - Linting avec ESLint
   - Build de l'application
   - Exécution des tests unitaires

2. **Job `docker`** (uniquement sur `main`)
   - Build de l'image Docker
   - Test de l'image construite
   - Vérification du health check

### Détails Techniques de la Pipeline

```yaml
# Exemple de configuration
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run lint
    - run: npm run build
    - run: npm run test
```

## Système de Thématisation Dynamique

### Principe de Fonctionnement

L'application implémente un système de thématisation unique permettant de basculer en temps réel entre deux frameworks UI :

#### Material UI (Google Material Design)
- **Style** : Design moderne et cohérent de Google
- **Composants** : Buttons, Cards, Modals avec animations fluides
- **Couleurs** : Palette Material Design 3
- **Avantages** : Familier, accessible, bien documenté

#### shadCN/UI (Modern Tailwind Components)
- **Style** : Interface moderne avec Tailwind CSS
- **Composants** : Composants modulaires et customisables
- **Couleurs** : Système de couleurs moderne
- **Avantages** : Léger, flexible, tendance

### Comment Utiliser

1. **Bouton de basculement** : Cliquer sur l'icône en haut à droite
2. **Changement instantané** : Tous les composants se transforment
3. **Persistance** : Le thème choisi est sauvegardé localement

### Architecture Technique

```typescript
// Context de thématisation
const ThemeContext = createContext<{
  theme: 'material' | 'shadcn';
  toggleTheme: () => void;
}>({
  theme: 'material',
  toggleTheme: () => {},
});

// Composants adaptatifs
const Button = ({ children, ...props }) => {
  const { theme } = useTheme();
  return theme === 'material' 
    ? <MaterialButton {...props}>{children}</MaterialButton>
    : <ShadcnButton {...props}>{children}</ShadcnButton>;
};
```

## Tests et Qualité

### Stratégie de Tests

L'application utilise **Vitest** et **React Testing Library** pour assurer une couverture de tests robuste :

#### Types de Tests
- **Tests unitaires** : Composants individuels et fonctions utilitaires
- **Tests d'intégration** : Interactions entre composants
- **Tests d'API** : Services backend fictifs avec MirageJS
- **Tests de thématisation** : Vérification des basculements de thèmes

### Commandes de Test

```bash
# Tests en mode watch (développement)
npm run test

# Tests avec interface graphique
npm run test:ui

# Tests avec rapport de couverture
npm run test:coverage

# Tests dans Docker
docker-compose run --rm app npm run test
```

### Configuration Vitest

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      reporter: ['text', 'html', 'lcov'],
      threshold: {
        global: {
          branches: 50,
          functions: 50,
          lines: 50,
          statements: 50
        }
      }
    }
  }
});
```

## Choix d'Architecture et Techniques

### Décisions Architecturales

#### Frontend Framework
- **React 19** : Dernière version stable avec nouvelles fonctionnalités
- **TypeScript** : Typage strict pour une meilleure maintenabilité
- **Vite** : Build tool moderne, HMR ultra-rapide

#### Gestion d'État
- **Context API** : Gestion d'état global simple et native
- **Hooks personnalisés** : Encapsulation de la logique métier
- **Local Storage** : Persistance des préférences utilisateur

#### Styling et UI
- **Tailwind CSS v4** : Framework CSS utilitaire moderne
- **Material UI + shadCN** : Double système de composants
- **Responsive Design** : Mobile-first approach

#### Backend Fictif
- **MirageJS** : Simulation d'API REST complète
- **JSON Server Alternative** : Données persistantes en mémoire
- **Gestion d'erreurs** : Simulation de cas d'erreur réalistes

#### Tests et Qualité
- **Vitest** : Test runner moderne et rapide
- **React Testing Library** : Tests centrés utilisateur
- **ESLint + TypeScript** : Analyse statique du code

### Justifications Techniques

#### Pourquoi MirageJS ?
- **Simulation complète** : API REST avec toutes les opérations CRUD
- **Développement rapide** : Pas besoin de backend réel
- **Tests facilités** : Données contrôlées et prévisibles
- **Transition facile** : Remplaçable par une vraie API

#### Pourquoi Double Thématisation ?
- **Démonstration technique** : Preuve de flexibilité architecturale
- **Expérience utilisateur** : Choix visuel pour différents goûts
- **Maintenabilité** : Composants abstraits et réutilisables

#### Pourquoi Docker ?
- **Consistance** : Même environnement partout
- **Déploiement simple** : Une commande pour tout démarrer
- **Production-ready** : Nginx optimisé pour les SPA

### Configuration Technique

#### Alias d'Imports
```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

#### Variables CSS Personnalisées
```css
/* Système de couleurs pour shadCN */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
}
```

#### Structure des Composants
```
src/themes/
├── material/      # Wrappers Material UI
├── shadcn/        # Wrappers shadCN
└── index.ts       # Export conditionnel
```

## 🚀 Développement et Contribution

### Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run preview` | Prévisualisation du build |
| `npm run test` | Tests en mode watch |
| `npm run test:ui` | Interface de tests |
| `npm run test:coverage` | Rapport de couverture |
| `npm run lint` | Analyse ESLint |

### Variables d'Environnement

```bash
# .env (optionnel)
NODE_ENV=development
VITE_API_URL=http://localhost:5173/api
```

### Bonnes Pratiques

- **Commits** : Messages clairs et descriptifs
- **Branches** : Feature branches avec PR
- **Tests** : Ajouter des tests pour nouvelles fonctionnalités
- **Types** : Typage strict TypeScript
- **Performance** : React.memo pour composants coûteux
