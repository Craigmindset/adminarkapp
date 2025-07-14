"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Edit, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface HomeCard {
  id: string
  title: string
  imageUrl: string
  buttonUrl: string
  isActive: boolean
}

const mockHomeCards: HomeCard[] = [
  {
    id: "CARD001",
    title: "Welcome to Ark of Light",
    imageUrl: "/placeholder.svg?height=200&width=300",
    buttonUrl: "https://arkoflight.com/welcome",
    isActive: true,
  },
  {
    id: "CARD002",
    title: "Sunday Service Live",
    imageUrl: "/placeholder.svg?height=200&width=300",
    buttonUrl: "https://arkoflight.com/live",
    isActive: true,
  },
  {
    id: "CARD003",
    title: "Prayer Requests",
    imageUrl: "/placeholder.svg?height=200&width=300",
    buttonUrl: "https://arkoflight.com/prayer",
    isActive: false,
  },
  {
    id: "CARD004",
    title: "Community Events",
    imageUrl: "/placeholder.svg?height=200&width=300",
    buttonUrl: "https://arkoflight.com/events",
    isActive: true,
  },
]

export default function HomeUpdatePage() {
  const [homeCards, setHomeCards] = useState<HomeCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCard, setEditingCard] = useState<HomeCard | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    buttonUrl: "",
    imageFile: null as File | null,
  })

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHomeCards(mockHomeCards)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleEditCard = (card: HomeCard) => {
    setEditingCard(card)
    setFormData({
      title: card.title,
      imageUrl: card.imageUrl,
      buttonUrl: card.buttonUrl,
      imageFile: null,
    })
    setIsDialogOpen(true)
  }

  const handleSaveCard = () => {
    if (editingCard) {
      // Update existing card
      const updatedCard = {
        ...editingCard,
        title: formData.title,
        imageUrl: formData.imageFile ? URL.createObjectURL(formData.imageFile) : formData.imageUrl,
        buttonUrl: formData.buttonUrl,
      }

      setHomeCards(homeCards.map((card) => (card.id === editingCard.id ? updatedCard : card)))
    }
    setIsDialogOpen(false)
    setEditingCard(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, imageFile: file })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Home Update</h1>
        <p className="text-muted-foreground">Manage home screen content and announcements displayed to users.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {homeCards.map((card) => (
          <Card key={card.id} className="relative group">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant={card.isActive ? "default" : "secondary"}>{card.isActive ? "Active" : "Inactive"}</Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEditCard(card)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={card.imageUrl || "/placeholder.svg"}
                  alt={card.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <CardTitle className="text-lg mb-2">{card.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600 break-all">URL: {card.buttonUrl}</CardDescription>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Home Card</DialogTitle>
            <DialogDescription>Update the card content that will be displayed on the home screen.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter card title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Update Image</Label>
              <div className="space-y-2">
                <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
                {(formData.imageFile || formData.imageUrl) && (
                  <div className="aspect-video w-full max-w-xs relative overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={formData.imageFile ? URL.createObjectURL(formData.imageFile) : formData.imageUrl}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="buttonUrl">Button URL</Label>
              <Input
                id="buttonUrl"
                value={formData.buttonUrl}
                onChange={(e) => setFormData({ ...formData, buttonUrl: e.target.value })}
                placeholder="https://example.com"
                type="url"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCard}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
