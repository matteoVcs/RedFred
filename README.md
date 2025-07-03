# RedFred

**Un jeu de plateforme passionnant où chaque saut compte !**

## Fonctionnalités

- **Gameplay simple et intuitif** - Contrôles faciles à apprendre, difficiles à maîtriser
- **Système de classement** - Scoreboard en temps réel avec Firebase
- **Application mobile** - Disponible sur Android et iOS
- **Multiples critères de score** - Classement par score, hauteur et temps
- **Interface utilisateur élégante** - Design moderne avec composants UI
- **Nombreuses îles** - Grande map a escalader
- **Shop dynamique** - Permet de nouvelles possibilitées a chaque nouvelle île atteinte

## Fonctionnalités du site web

- **Page d'accueil** - Présentation du jeu et téléchargements
- **Carrousel d'images** - Captures d'écran du jeu
- **Scoreboard interactif** - Classement des joueurs avec tri
- **Panel d'administration** - Gestion des données (pour les administrateurs)
- **Profils utilisateur** - Informations et statistiques des joueurs

## Développement

### Base de données Firebase

Les données sont stockées dans Firebase Realtime Database avec la structure suivante :
- Scores des joueurs (score, hauteur, temps)
- Informations utilisateur (nom, UID)
- Métadonnées du jeu

## Le Jeu

### Principe du jeu
RedFred met en scène un **stickman rouge** dans un univers de plateforme vertical où l'objectif est de grimper le plus haut possible. Le joueur contrôle ce personnage emblématique à travers différents niveaux remplis de défis et d'opportunités.

### Objectifs du jeu
- Grimpez le plus haut possible
- Collectez un maximum de points
- Découvrez tous les shops et leurs formes uniques
- Maîtrisez les différentes propriétés des formes spéciales
- Battez vos records et ceux de vos amis

### Mécaniques de jeu
- **Déplacements** : Bougez votre stickman de gauche à droite pour naviguer entre les plateformes
- **Saut** : Utilisez le saut pour atteindre les plateformes supérieures
- **Escalade progressive** : Chaque niveau vous mène vers de nouvelles hauteurs avec des défis croissants

### Système de Shop
Le jeu intègre un système de boutique innovant qui enrichit l'expérience :

#### Shop Principal
- **Formes de base** : Achetez différentes formes géométriques
- **Accès aux plateformes** : Ces formes servent de clés pour débloquer de nouvelles zones
- **Progression** : Chaque forme achetée ouvre l'accès à des plateformes spécifiques

#### Shops Avancés
Au fur et à mesure de votre progression, vous découvrirez des boutiques spécialisées :
- **Formes spéciales** : Objets avec des propriétés uniques
- **Trampoline** : Formes qui permettent des sauts plus hauts et plus puissants
- **Anti-gravité** : Formes qui éliminent temporairement la gravité
- **Boost de vitesse** : Formes qui accélèrent les déplacements
- **Plateformes flottantes** : Accès à des zones autrement inaccessibles

### Comment jouer

1. **Téléchargez l'application mobile**
   - Android : Téléchargez le fichier APK depuis le site web
   - iOS : Téléchargez le fichier IPA depuis le site web

2. **Maîtrisez les contrôles**
   - **Déplacement** : Glissez horizontalement pour bouger le stickman
   - **Saut** : Tapez pour faire sauter votre personnage
   - **Shop** : Interagissez avec les boutiques pour acheter des formes

3. **Stratégie de progression**
   - Collectez des points en explorant
   - Investissez dans les bonnes formes au bon moment
   - Utilisez les propriétés spéciales des formes pour atteindre de nouvelles hauteurs
   - Explorez chaque plateforme pour découvrir tous les shops

4. **Consultez le classement**
   - Visitez le site web pour voir votre position
   - Défiez vos amis et battez les records de hauteurun jeu de plateforme mobile avec un système de classement compétitif. Grimpez le plus haut possible, battez vos records et défiez vos amis dans ce jeu addictif !

## Technologies utilisées

### Frontend Web
- **Next.js** - Framework React pour la production
- **TypeScript** - Typage statique pour JavaScript
- **Tailwind CSS** - Framework CSS utilitaire
- **ShadCN** - Librarie de component

### Backend & Database
- **Firebase** - Base de données en temps réel et authentification
- **Firebase Realtime Database** - Stockage des scores et données utilisateur

### Mobile
- **Unity** - Application de création de jeu

## Installation

### Prérequis

## Web
- Node.js (version 18 ou supérieure)
- npm ou yarn
- Compte Firebase


### Configuration

1. **Clonez le repository**
   ```bash
   git clone https://github.com/matteoVcs/RedFred
   cd RedFred
   ```
2. **Installez les dépendances**
   ```bash
   npm install
   ```
3. **Configuration Firebase**
   
   Créez un fichier `.env.local` dans le dossier red-fred (ces donnée sont fournis dans le txt avec le lien du github) :

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=votre_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_auth_domain
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=votre_database_url
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=votre_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=votre_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=votre_measurement_id
   ```

4. **Lancez le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Accédez à l'application**
   
   Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.


## Unity
- Unity 6000.0.26f1

### Configuration
1. **Préparer votre projet Unity**
    Ouvrez votre projet Unity.
    Assurez-vous d’utiliser une version Unity compatible avec Firebase (généralement Unity 2019.4 ou plus récent).

2. **Télécharger le SDK Firebase pour Unity**

    Rendez-vous sur la page officielle : [Firebase Unity SDK](https://firebase.google.com/download/unity)
    Téléchargez le package .zip adapté à votre version de Unity.
    Extrayez le fichier téléchargé.

3. **Importer le SDK dans Unity**

    Dans Unity, allez dans Assets > Import Package > Custom Package...
    Sélectionnez les fichiers .unitypackage dont vous avez besoin (par exemple, FirebaseApp.unitypackage, FirebaseAuth.unitypackage, FirebaseDatabase.unitypackage, etc.) selon les services Firebase que vous souhaitez utiliser.
    Cliquez sur Import pour ajouter les fichiers à votre projet.

4. **Configurer Firebase dans la console Firebase**

    Rendez-vous sur console.firebase.google.com.
    Créez un projet Firebase ou ouvrez un projet existant.
    Cliquez sur “Ajouter une application” et choisissez Android.
    Saisissez le nom du package de votre application Unity (vous pouvez le trouver dans Edit > Project Settings > Player > Android > Other Settings > Package Name).
    Téléchargez le fichier google-services.json fourni par la console.

5. **Ajouter google-services.json à votre projet Unity**

    Placez le fichier google-services.json dans le dossier Assets de votre projet Unity.

6. **Configurer les dépendances Android (External Dependency Manager)**

    Après avoir importé le SDK Firebase, le plugin “External Dependency Manager” (anciennement Play Services Resolver) est normalement inclus.
    Pour forcer la résolution des dépendances, allez dans Assets > External Dependency Manager > Android Resolver > Resolve.

## Structure du projet

```
RedFred/
├── README.md
├── RedFredUnity.7z          # Code source Unity du jeu
└── red-fred/                # Application web Next.js
    ├── public/
    │   └── assets/
    │       ├── gameFile/    # Fichiers APK et IPA
    │       └── images/      # Images et captures d'écran
    ├── src/
    │   ├── app/             # Pages Next.js
    │   ├── components/      # Composants React
    │   ├── hooks/           # Hooks personnalisés
    │   └── lib/             # Utilitaires et configuration
    └── package.json
```

## Contribution

- **Mattéo Vocanson**
- **Dimitri Brancourt**
