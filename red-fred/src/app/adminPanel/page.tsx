"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { database } from "@/lib/firebase";
import { ref, get, set } from "firebase/database";

type User = {
  uid: string;
  email: string;
  username?: string;
  photoURL?: string;
  admin?: boolean;
  lastLogin?: string;
  banEnd?: number | null;
};

export default function PanelAdmin() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [banPermanent, setBanPermanent] = useState(false);
  const [banDays, setBanDays] = useState(0);
  const [banHours, setBanHours] = useState(0);
  const [banMinutes, setBanMinutes] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // Auth + admin check
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/");
        return;
      }

      const userRef = ref(database, "users/" + user.uid);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.admin === true) {
          setAuthorized(true);
        } else {
          router.push("/");
        }
      } else {
        router.push("/");
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authorized) return;
    setLoading(true);
    const fetchAllUsers = async () => {
      const usersRef = ref(database, "users");
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const list: User[] = Object.keys(data).map((uid) => ({
          uid,
          ...data[uid],
          banEnd: data[uid].banEnd ?? null,
        }));
        setUsers(list);
      }
      setLoading(false);
    };
    fetchAllUsers();
  }, [authorized]);

  const openBanModal = (user: User) => {
    setSelectedUser(user);
    setBanPermanent(false);
    setBanDays(0);
    setBanHours(0);
    setBanMinutes(0);
    setShowModal(true);
  };

  const calculateBanEnd = (): number | null => {
    if (banPermanent) return -1;
    const totalMs =
      banDays * 86400000 + banHours * 3600000 + banMinutes * 60000;
    return totalMs > 0 ? Date.now() + totalMs : null;
  };

  const handleBanUser = async () => {
    if (!selectedUser) return;
    const banEndTimestamp = calculateBanEnd();
    if (banEndTimestamp === null) {
      alert("Veuillez définir une durée ou choisir ban permanent.");
      return;
    }

    try {
      const userRef = ref(database, "users/" + selectedUser.uid);
      await set(userRef, {
        ...selectedUser,
        banEnd: banEndTimestamp,
      });
      setUsers((prev) =>
        prev.map((u) =>
          u.uid === selectedUser.uid ? { ...u, banEnd: banEndTimestamp } : u
        )
      );
      setShowModal(false);
      setSelectedUser(null);
    } catch {
      alert("Erreur lors du bannissement.");
    }
  };

  const handleUnbanUser = async (user: User) => {
    try {
      const userRef = ref(database, "users/" + user.uid);
      await set(userRef, {
        ...user,
        banEnd: null,
      });
      setUsers((prev) =>
        prev.map((u) => (u.uid === user.uid ? { ...u, banEnd: null } : u))
      );
    } catch {
      alert("Erreur lors du débannissement.");
    }
  };

  const formatBanEnd = (banEnd: number | null | undefined) => {
    if (banEnd === null || banEnd === undefined) return "Aucun ban";
    if (banEnd === -1) return "Ban permanent";
    const date = new Date(banEnd);
    return date < new Date() ? "Ban expiré" : date.toLocaleString();
  };

  const filteredUsers = search.trim()
    ? users.filter((u) =>
        (u.username || "").toLowerCase().includes(search.toLowerCase())
      )
    : users;

  if (!authChecked) return <div>Chargement...</div>;
  if (!authorized) return null;

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-4 rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">
        Panel Admin - Liste des utilisateurs
      </h1>

      <input
        type="text"
        placeholder="Rechercher par nom d'utilisateur..."
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-sm bg-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">UID</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Ban End</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
            {filteredUsers.map((user) => {
              const isBanned =
                user.banEnd === -1 ||
                (typeof user.banEnd === "number" && user.banEnd > Date.now());
              return (
                <tr key={user.uid} className="hover:bg-gray-50">
                  <td className="border p-2 text-sm">{user.uid}</td>
                  <td className="border p-2 text-sm">
                    {user.username || "Sans pseudo"}
                  </td>
                  <td className="border p-2 text-sm">{user.email}</td>
                  <td className="border p-2 text-sm">
                    {formatBanEnd(user.banEnd)}
                  </td>
                  <td className="border p-2 text-center space-x-2">
                    <button
                      onClick={() => openBanModal(user)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                    >
                      Ban
                    </button>
                    {isBanned && (
                      <button
                        onClick={() => handleUnbanUser(user)}
                        className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
                      >
                        Déban
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Modal de ban */}
      {showModal && selectedUser && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-md max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">
              Bannir {selectedUser.username || selectedUser.uid}
            </h2>

            <label className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                checked={banPermanent}
                onChange={(e) => setBanPermanent(e.target.checked)}
              />
              <span>Ban permanent</span>
            </label>

            {!banPermanent && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label>Jours</label>
                  <input
                    type="number"
                    min={0}
                    value={banDays}
                    onChange={(e) =>
                      setBanDays(parseInt(e.target.value) || 0)
                    }
                    className="border p-1 w-full"
                  />
                </div>
                <div>
                  <label>Heures</label>
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={banHours}
                    onChange={(e) =>
                      setBanHours(parseInt(e.target.value) || 0)
                    }
                    className="border p-1 w-full"
                  />
                </div>
                <div>
                  <label>Minutes</label>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={banMinutes}
                    onChange={(e) =>
                      setBanMinutes(parseInt(e.target.value) || 0)
                    }
                    className="border p-1 w-full"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Annuler
              </button>
              <button
                onClick={handleBanUser}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirmer ban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
