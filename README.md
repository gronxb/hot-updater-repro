## src Directory Structure

This document outlines the standard folder structure for the /src directory. Adhering to this structure ensures consistency, scalability, and ease of navigation across the project.

```
src/
├── app/                  # ROUTING: Strictly for Expo Router file-based routes. Folder and file names here define the app's URL structure.
│   ├── (tabs)/           #   -> ROUTE GROUP: Organizes a set of routes (e.g., for a tab bar) without affecting the URL path.
│   │   ├── _layout.tsx   #   -> LAYOUT: Defines the shared UI for the tabs, such as the tab bar itself.
│   │   └── home.tsx      #   -> SCREEN: Represents a screen within the (tabs) group, accessible at '/'.
│   ├── profile.tsx       #   -> SCREEN: Represents a top-level screen accessible at '/profile'.
│   └── _layout.tsx       #   -> ROOT LAYOUT: The main layout for the entire app. Essential for setting up global providers.
│
├── assets/               # STATIC FILES: Contains all static assets like fonts, images, and other media.
│   ├── fonts/            #   -> FONT FILES: For custom font files (.ttf, .otf).
│   └── images/           #   -> IMAGE FILES: For images, logos, and icons (.png, .svg).
│
├── components/           # SHARED UI: Global, reusable, presentation-only UI components (Atomic Design).
│   ├── atoms/            #   -> ATOMS: The smallest, indivisible UI elements (Button, Input, Text).
│   ├── molecules/        #   -> MOLECULES: Simple combinations of atoms to form a single unit (SearchField, PasswordInput).
│   └── organisms/        #   -> ORGANISMS: Complex UI sections composed of atoms and molecules (Header, PostCard, ProductList).
│
├── config/               # CONFIGURATION: App-wide configuration, environment variables, and third-party library settings.
│   └── environment.ts    #   -> EXAMPLE: A file to manage environment variables (API URLs, keys, etc.).
│
├── constants/            # UNCHANGING VALUES: Application-wide constants that never change (e.g., route names, storage keys, regex patterns).
│   └── index.ts          #   -> Central export file for all constants.
│
├── contexts/             # REACT CONTEXT: For global state management using React Context API. Ideal for low-frequency updates.
│   └── AuthProvider.tsx  #   -> EXAMPLE: A context provider to manage and share user authentication state.
│
├── features/             # FEATURE MODULES: Business logic and components grouped by application feature or domain.
│   └── authentication/   #   -> EXAMPLE FEATURE: A module for everything related to user authentication.
│       ├── components/   #       -> FEATURE COMPONENTS: UI components used ONLY within the authentication feature (e.g., LoginForm).
│       ├── hooks/        #       -> FEATURE HOOKS: Custom hooks used ONLY within the authentication feature (e.g., useLogin).
│       └── services/     #       -> FEATURE SERVICES: Network request functions specific to this feature (e.g., loginUser, registerUser).
│
├── hooks/                # GLOBAL HOOKS: Reusable custom React hooks that can be used across any feature.
│   └── useDebounce.ts    #   -> EXAMPLE: A hook to delay function execution, useful for search inputs.
│
├── navigation/           # NAVIGATION HELPERS: Types, configurations, or hooks related to routing and navigation.
│   └── types.ts          #   -> EXAMPLE: TypeScript definitions for route parameters.
│
├── services/             # GLOBAL SERVICES: Core, shared services, including the base API client configuration.
│   └── apiClient.ts      #   -> EXAMPLE: A configured Axios or Fetch instance with base URL, headers, and interceptors.
│
├── store/                # GLOBAL STATE: For a global state management library like Zustand, Redux, or Jotai.
│   ├── userSlice.ts      #   -> EXAMPLE: A "slice" of the global state dedicated to managing user data.
│   └── index.ts          #   -> Central store configuration and setup.
│
├── theme/                # STYLING & THEME: Global styling variables and theme configuration.
│   ├── colors.ts         #   -> App color palette.
│   ├── fonts.ts          #   -> Font sizes, weights, and families.
│   └── spacing.ts        #   -> Consistent spacing units (margins, paddings).
│
├── types/                # TYPESCRIPT TYPES: Global TypeScript interfaces, types, and enums.
│   └── index.d.ts        #   -> A file for global type declarations.
│
└── utils/                # UTILITIES: Global, reusable helper functions that are pure and have no side effects.
    └── formatDate.ts     #   -> EXAMPLE: A function to format date objects into user-friendly strings.
```
