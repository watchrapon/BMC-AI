"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Edit2, Save, Plus, Trash2, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

interface EditableSectionProps {
  title: string
  items: string[]
  onSave: (items: string[]) => void
  gradient?: boolean
}

export function EditableSection({ title, items, onSave, gradient = false }: EditableSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedItems, setEditedItems] = useState<string[]>([...items])
  const { language } = useLanguage()

  const handleEdit = () => {
    setIsEditing(true)
    setEditedItems([...items])
  }

  const handleSave = () => {
    // Filter out empty items
    const filteredItems = editedItems.filter((item) => item.trim() !== "")
    onSave(filteredItems)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedItems([...items])
  }

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...editedItems]
    newItems[index] = value
    setEditedItems(newItems)
  }

  const handleAddItem = () => {
    setEditedItems([...editedItems, ""])
  }

  const handleRemoveItem = (index: number) => {
    const newItems = [...editedItems]
    newItems.splice(index, 1)
    setEditedItems(newItems)
  }

  return (
    <div
      className={`${
        gradient ? "bg-gradient-to-br from-indigo-500/20 to-rose-500/20" : "bg-white/[0.03]"
      } backdrop-blur-sm border ${
        gradient ? "border-white/20" : "border-white/10"
      } rounded-xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 group`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {!isEditing ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white/60 hover:text-white hover:bg-white/10 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
          >
            <Edit2 className="h-4 w-4 mr-1 text-indigo-300" />
            {translations.edit[language]}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="text-white/60 hover:text-white hover:bg-white/10 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
            >
              <X className="h-4 w-4 mr-1 text-rose-300" />
              {translations.cancel[language]}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="text-indigo-300 hover:text-indigo-200 hover:bg-indigo-500/20 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
            >
              <Save className="h-4 w-4 mr-1 text-indigo-300" />
              {translations.save[language]}
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          {editedItems.map((item, index) => (
            <div key={index} className="flex gap-2 items-start">
              <textarea
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                className="flex-grow bg-white/10 border border-white/20 rounded-md p-2 text-white text-sm min-h-[60px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveItem(index)}
                className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 mt-1 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddItem}
            className="w-full mt-2 border-dashed border-white/20 text-white/60 hover:text-white hover:bg-white/5 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-1 text-indigo-300" />
            {translations.addItem[language]}
          </Button>
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="text-white/80 flex items-start">
              <span className={gradient ? "text-rose-400 mr-2" : "text-indigo-400 mr-2"}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
