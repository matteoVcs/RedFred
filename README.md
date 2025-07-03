# RedFred

**Un jeu de plateforme passionnant où chaque saut compte !**

## Fonctionnalités

- **Personnage emblématique** - Incarnez un stickman rouge dans un univers coloré
- **Gameplay simple et intuitif** - Contrôles faciles à apprendre, difficiles à maîtriser
- **Système de shop avancé** - Boutiques avec formes aux propriétés uniques
- **Formes spéciales** - Trampolines, anti-gravité, boost de vitesse et plus
- **Progression par plateformes** - Débloquez de nouvelles zones avec vos achats
- **Système de classement** - Scoreboard en temps réel avec Firebase
- **Application mobile native** - Disponible sur Android et iOS
- **Interface web moderne** - Site web avec Next.js et Tailwind CSS
- **Multiples critères de score** - Classement par score, hauteur et temps
- **Interface utilisateur élégante** - Design moderne avec composants UIsaut compte !**
## Le Jeu

### Principe du jeu
RedFred met en scène un **stickman rouge** dans un univers de plateforme vertical où l'objectif est de grimper le plus haut possible. Le joueur contrôle ce personnage emblématique à travers différents niveaux remplis de défis et d'opportunités.

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

## Fonctionnalités

- **Gameplay simple et intuitif** - Contrôles faciles à apprendre, difficiles à maîtriser
- **Système de classement** - Scoreboard en temps réel avec Firebase
- **Application mobile** - Disponible sur Android et iOS
- **Interface web moderne** - Site web avec Next.js et Tailwind CSS
- **Multiples critères de score** - Classement par score, hauteur et temps
- **Interface utilisateur élégante** - Design moderne avec composants UI

## Technologies utilisées

### Frontend Web
- **Next.js 15** - Framework React pour la production
- **React 19** - Bibliothèque JavaScript pour l'interface utilisateur
- **TypeScript** - Typage statique pour JavaScript
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **Radix UI** - Composants UI accessibles

### Backend & Database
- **Firebase** - Base de données en temps réel et authentification
- **Firebase Realtime Database** - Stockage des scores et données utilisateur

### Mobile
- **Applications natives** - Fichiers APK (Android) et IPA (iOS) disponibles

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



## Comment jouer

1. **Téléchargez l'application mobile**
   - Android : Téléchargez le fichier APK depuis le site web
   - iOS : Téléchargez le fichier IPA depuis le site web

2. **Jouez et grimpez**
   - Utilisez les contrôles tactiles pour faire sauter votre personnage
   - Grimpez le plus haut possible
   - Collectez des points en cours de route

3. **Consultez le classement**
   - Visitez le site web pour voir votre position
   - Défiez vos amis et battez les records

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

## 📱 Applications mobiles

### 🎮 Expérience de jeu mobile
L'application mobile RedFred offre une expérience de jeu complète et immersive :

#### 🚶 Personnage
- **Stickman rouge** : Personnage principal iconique et facilement reconnaissable
- **Animations fluides** : Déplacements et sauts naturels et réactifs
- **Contrôles tactiles** : Interface optimisée pour les écrans tactiles

#### 🎯 Mécaniques de jeu
- **Déplacement horizontal** : Naviguez de gauche à droite sur les plateformes
- **Saut dynamique** : Système de saut précis pour atteindre les plateformes
- **Exploration verticale** : Grimpez toujours plus haut pour battre vos records

#### 🛒 Système de boutique intégré
- **Shops distribués** : Boutiques placées stratégiquement sur différentes plateformes
- **Formes collectibles** : Large variété de formes géométriques à acheter
- **Progression basée sur les achats** : Les formes débloquent l'accès à de nouvelles zones

#### ⚡ Formes spéciales et leurs effets
- **🦘 Trampoline** : Permet des sauts plus hauts et plus puissants
- **🌀 Anti-gravité** : Élimine temporairement la gravité pour des déplacements libres
- **⚡ Boost de vitesse** : Accélère les déplacements horizontaux
- **🔓 Clés d'accès** : Formes qui débloquent des plateformes spécifiques
- **🌟 Effets combinés** : Certaines formes offrent plusieurs propriétés

#### 📊 Système de progression
- **Collecte de points** : Gagnez des points en explorant et en atteignant de nouvelles hauteurs
- **Économie interne** : Utilisez vos points pour acheter des formes dans les shops
- **Déblocage séquentiel** : Accédez à de nouvelles zones grâce à vos achats stratégiques

### 📥 Téléchargement
Les fichiers de l'application mobile sont disponibles dans :
- `public/assets/gameFile/redfred.apk` - Version Android
- `public/assets/gameFile/redfred.ipa` - Version iOS

### 🎯 Objectifs du jeu
- Grimpez le plus haut possible
- Collectez un maximum de points
- Découvrez tous les shops et leurs formes uniques
- Maîtrisez les différentes propriétés des formes spéciales
- Battez vos records et ceux de vos amis

## Contribution

- **Mattéo Vocanson**
- **Dimitri Brancourt**
