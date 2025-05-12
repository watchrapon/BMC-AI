"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "th" : "en")
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200 flex items-center gap-2 font-medium"
    >
      <Globe className="h-4 w-4 text-indigo-300" />
      {translations.language[language]}
    </Button>
  )
}
