"use client";

import { auth, database } from "@/lib/firebase";
import {
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { AnimatePresence, motion } from "framer-motion";

const UserStatus = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = ref(database, "users/" + currentUser.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) setUserData(snapshot.val());
      } else {
        setUser(null);
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null);
    router.push("/");
    window.location.reload();
  };

  const handleAuth = async () => {
    setError(null);
    try {
      const now = new Date().toISOString();

      if (!email || !password || (!isLogin && (!confirmPassword || !username))) {
        setError("Veuillez remplir tous les champs.");
        return;
      }

      if (!isLogin && password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }

      let userCredential;

      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }

      const user = userCredential.user;
      const userRef = ref(database, "users/" + user.uid);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        await set(userRef, {
          ...snapshot.val(),
          email: user.email,
          uid: user.uid,
          lastLogin: now,
        });
      } else {
        await set(userRef, {
          email: user.email,
          uid: user.uid,
          username: username,
          admin: false,
          lastLogin: now,
          banEnd: null,
        });
      }

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUsername("");
      setIsLogin(true);
      setError(null);

      const dialog = dialogRef.current?.closest("[data-state='open']");
      if (dialog) {
        (dialog.querySelector("button[aria-label='Close']") as HTMLElement)?.click?.();
      }

      window.location.reload();
    } catch (error: any) {
      const firebaseError = error.message?.split(":")?.[1]?.trim() ?? "Une erreur est survenue.";
      setError(firebaseError);
    }
  };

  const isBanned = () => {
    if (!userData) return false;
    const now = Date.now();
    const banEnd = userData.banEnd;
    return banEnd === -1 || (banEnd && banEnd > now);
  };

  return (
    <div className="h-full">
      {user && userData ? (
        <SidebarMenu className="h-full">
          <SidebarMenuItem className="h-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-full flex items-center">
                  <div className="flex flex-row items-center space-x-3">
                    <img
                      src={userData.photoURL || "https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-man-avatar-isolated-on-white-background-png-image_4891418.png"}
                      alt="User Avatar"
                      className="h-5 w-5 rounded-full"
                    />
                    <p>
                      {userData.username}
                      {isBanned() && (
                        <span className="text-red-600 font-semibold ml-2">(Banni)</span>
                      )}
                    </p>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="p-2 text-sm shadow-sm rounded-md">
                {userData.admin && (
                  <DropdownMenuItem>
                    <a href="/adminPanel">Admin</a>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <a href="/profile">Profile</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={handleLogout}>Logout</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      ) : (
        <SidebarMenu className="h-full">
          <SidebarMenuItem className="h-full">
            <Dialog>
              <DialogTrigger asChild>
                <SidebarMenuButton className="h-full flex items-center">
                  <div className="flex flex-row items-center space-x-3">
                    <img
                      src="https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-man-avatar-isolated-on-white-background-png-image_4891418.png"
                      className="h-5 w-5 rounded-full"
                    />
                    <p>Guest <span className="text-[9px] font-semibold">(click here to login/signup)</span></p>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DialogTrigger>
              <DialogContent ref={dialogRef}>
                <DialogHeader>
                  <DialogTitle>{isLogin ? "Connexion" : "Inscription"}</DialogTitle>
                </DialogHeader>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={isLogin ? "login" : "register"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 py-4"
                  >
                    {!isLogin && (
                      <div>
                        <Label htmlFor="username">Nom d'utilisateur</Label>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    )}
                    <div>
                      <Label htmlFor="email">Adresse e-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {!isLogin && (
                      <div>
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    )}
                    {error && (
                      <p className="text-sm text-red-500 pt-1">{error}</p>
                    )}
                    <div className="flex justify-between items-center gap-4 pt-2">
                      <Button onClick={handleAuth}>
                        {isLogin ? "Se connecter" : "S'inscrire"}
                      </Button>
                      <button
                        className="text-sm underline text-muted-foreground"
                        onClick={() => {
                          setIsLogin(!isLogin);
                          setError(null);
                        }}
                      >
                        {isLogin ? "Créer un compte" : "J'ai déjà un compte"}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
      )}
    </div>
  );
};

export default UserStatus;
