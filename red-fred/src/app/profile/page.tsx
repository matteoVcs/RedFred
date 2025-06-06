"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth, database } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, update } from "firebase/database";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

type UserData = {
  uid: string;
  email: string;
  photoURL?: string;
  username?: string;
  lastLogin?: string;
  banEnd?: number | null;
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userRef = ref(database, `users/${authUser.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val() as UserData;
          setUser(data);
        }
      } else {
        setUser(null);
        router.push("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSave = async () => {
    if (!user || !newUsername.trim()) return;
    setSaving(true);

    const userRef = ref(database, `users/${user.uid}`);
    const updatedUser = {
      ...user,
      username: newUsername.trim(),
      lastLogin: new Date().toISOString(),
    };

    await update(userRef, {
      username: updatedUser.username,
      lastLogin: updatedUser.lastLogin,
    });

    setUser(updatedUser);
    setEditing(false);
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const isBanned =
    user?.banEnd !== null &&
    user?.banEnd !== undefined &&
    (user.banEnd === -1 || user.banEnd > Date.now());

  const formatBanDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      {isBanned && (
        <div className="mb-6 p-4 bg-red-100 border border-red-500 rounded text-center">
          <h2 className="text-4xl font-bold text-red-700 uppercase">BANNI</h2>
          {user.banEnd !== -1 ? (
            <p className="text-red-600 mt-2">
              Fin du ban le : {user.banEnd !== undefined && user.banEnd !== null ? formatBanDate(user.banEnd) : ""}
            </p>
          ) : (
            <p className="text-red-600 mt-2">Ban permanent</p>
          )}
        </div>
      )}

      <div>Bonjour, {user?.username}</div>
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-semibold">Profile</h1>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">
              Nom d'utilisateur
            </label>

            {!editing ? (
              <div className="flex items-center justify-between">
                <span className="text-base">
                  {user?.username || "Aucun pseudo défini"}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setNewUsername(user?.username || "");
                    setEditing(true);
                  }}
                >
                  <Pencil className="w-4 h-4 mr-1" /> Modifier
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Input
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Nouveau pseudo"
                />
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Enregistrement..." : "Confirmer"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
