"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "./ui/table";
import { database } from "@/lib/firebase";
import { ref, child, get } from "firebase/database";

type ScoreEntry = {
  uid: string
  username: string
  score: number
  height: number
  time: number
}

export function Scoreboard() {
  const [sortBy, setSortBy] = useState<'score' | 'height' | 'time'>('score')
  const [page, setPage] = useState(0)
  const [scores, setScores] = useState<ScoreEntry[]>([])
  const [loading, setLoading] = useState(true)
  const SCORES_PER_PAGE = 10

  useEffect(() => {
    const fetchScores = async () => {
      const dbRef = ref(database)
      try {
        const [scoresSnap, usersSnap] = await Promise.all([
          get(child(dbRef, 'scores')),
          get(child(dbRef, 'users'))
        ])
        if (!scoresSnap.exists()) return
        const scoresData = scoresSnap.val()
        const usersData = usersSnap.exists() ? usersSnap.val() : {}

        const parsedScores: ScoreEntry[] = Object.entries(scoresData).map(([uid, entry]: [string, any]) => ({
          uid,
          username: usersData && usersData[uid] && usersData[uid].username ? usersData[uid].username : 'Anonyme',
          score: entry?.score ?? 0,
          height: entry?.height ?? 0,
          time: entry?.time ?? 0
        }))
        setScores(parsedScores)
      } catch (err) {
        console.error('Erreur lors du chargement des scores :', err)
      } finally {
        setLoading(false)
      }
    }
    fetchScores()
  }, [])

  useEffect(() => {
    setPage(0)
  }, [sortBy, scores.length])

  const sortedScores = [...scores].sort((a, b) => {
    if (typeof a[sortBy] === "number" && typeof b[sortBy] === "number") {
      return b[sortBy] - a[sortBy]
    }
    return 0
  })
  const paginatedScores = sortedScores.slice(page * SCORES_PER_PAGE, (page + 1) * SCORES_PER_PAGE)
  const totalPages = Math.ceil(sortedScores.length / SCORES_PER_PAGE)

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Tableau des scores</h2>
        <Select onValueChange={(value) => {
          setSortBy(value as 'score' | 'height' | 'time')
        }} defaultValue="score">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="score">Score</SelectItem>
            <SelectItem value="height">Hauteur</SelectItem>
            <SelectItem value="time">Temps</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rang</TableHead>
              <TableHead>Joueur</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Hauteur</TableHead>
              <TableHead>Temps</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: SCORES_PER_PAGE }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell><Skeleton className="h-4 w-6" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  </TableRow>
                ))
              : paginatedScores.map((score, index) => (
                  <TableRow key={score.uid + "-" + index}>
                    <TableCell>{page * SCORES_PER_PAGE + index + 1}</TableCell>
                    <TableCell>{score.username}</TableCell>
                    <TableCell>{typeof score.score === "number" ? score.score.toFixed(2) : "—"}</TableCell>
                    <TableCell>{typeof score.height === "number" ? score.height : "—"}</TableCell>
                    <TableCell>
                      {typeof score.time === "number" ? score.time.toFixed(2) : "—"}s
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-end items-center gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            Précédent
          </Button>
          <span>Page {page + 1} / {totalPages}</span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
          >
            Suivant
          </Button>
        </div>
      )}
    </section>
  );
}
