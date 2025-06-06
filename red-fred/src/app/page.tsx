'use client'

import { useEffect, useState } from 'react'
import { database } from '@/lib/firebase'
import { ref, child, get } from 'firebase/database'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ImageCarousel } from '@/components/imageCarousel'
import { Scoreboard } from '@/components/scoreboard'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'


export default function HomePage() {
  return (
    <main className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Bienvenue sur <span className='text-red-700'>RedFred!</span></h1>
        <p className="text-lg text-muted-foreground">
          Un jeu de plateforme où chaque saut compte. Grimpez dans le classement !
        </p>
        <Dialog>
      <DialogTrigger asChild>
        <Button>Commencer à jouer</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Choisissez votre plateforme</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <a
            href="http://localhost:3000/assets/gameFile/redfred.apk"
            download
            className="flex items-center gap-3 hover:bg-muted p-2 rounded"
          >
            <img
              src="/assets/images/android.png"
              alt="Android"
              className="w-8 h-8"
            />
            <span>Télécharger pour Android</span>
          </a>
          <a
            href="http://localhost:3000/assets/gameFile/redfred.ipa"
            download
            className="flex items-center gap-3 hover:bg-muted p-2 rounded"
          >
            <img
              src="/assets/images/ios.png"
              alt="iOS"
              className="w-8 h-8"
            />
            <span>Télécharger pour iOS</span>
          </a>
        </div>
      </DialogContent>
    </Dialog>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <Card key="1">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Gameplay simple</h2>
              <p>Un système de contrôle intuitif qui rend le jeu accessible à tous.</p>
            </CardContent>
          </Card>
          <Card key="2">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Scoreboard</h2>
              <p>Consultez le classement des meilleurs joueurs et défiez vos amis.</p>
            </CardContent>
          </Card>
          <Card key="3">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Application mobile</h2>
              <p>Profitez d’une expérience de jeu fluide ou que vous soyez.</p>
            </CardContent>
          </Card>
      </section>

      <ImageCarousel />
      <Scoreboard />
      
    </main>
  )
}
