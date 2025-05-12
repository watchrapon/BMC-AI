"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, Loader2, FileIcon as FileSparkles } from "lucide-react"
import { generateBMC } from "@/app/actions/generate-bmc"

// Import the language context and translations
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { LanguageToggle } from "@/components/language-toggle"

// Update the component to use translations
export default function CreateBMC() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    customerSegments: "",
    valuePropositions: "",
    revenueStreams: "",
  })

  // Add the useLanguage hook
  const { language } = useLanguage()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Pass the language to the generateBMC function
      const bmcData = await generateBMC(formData, language)

      // Store the generated BMC in localStorage to access it on the result page
      localStorage.setItem("bmcData", JSON.stringify(bmcData))

      // Navigate to the result page
      router.push("/result")
    } catch (error) {
      console.error("Error generating BMC:", error)
      alert("There was an error generating your Business Model Canvas. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      {/* Decorative shapes */}
      <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-gradient-to-br from-rose-500/10 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {translations.backToHome[language]}
            </Button>
          </Link>
          <LanguageToggle />
        </div>

        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{translations.createYourBMC[language]}</h1>
          <p className="text-white/60 mb-8">{translations.formDescription[language]}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="businessName" className="block text-white font-medium">
                {translations.businessName[language]}
              </label>
              <Input
                id="businessName"
                name="businessName"
                placeholder={translations.businessNamePlaceholder[language]}
                value={formData.businessName}
                onChange={handleChange}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="customerSegments" className="block text-white font-medium">
                {translations.customerSegments[language]}
              </label>
              <Textarea
                id="customerSegments"
                name="customerSegments"
                placeholder={translations.customerSegmentsPlaceholder[language]}
                value={formData.customerSegments}
                onChange={handleChange}
                required
                rows={3}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="valuePropositions" className="block text-white font-medium">
                {translations.valuePropositions[language]}
              </label>
              <Textarea
                id="valuePropositions"
                name="valuePropositions"
                placeholder={translations.valuePropositionsPlaceholder[language]}
                value={formData.valuePropositions}
                onChange={handleChange}
                required
                rows={3}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="revenueStreams" className="block text-white font-medium">
                {translations.revenueStreams[language]}{" "}
                <span className="text-white/40 text-sm">({translations.optional[language]})</span>
              </label>
              <Textarea
                id="revenueStreams"
                name="revenueStreams"
                placeholder={translations.revenueStreamsPlaceholder[language]}
                value={formData.revenueStreams}
                onChange={handleChange}
                rows={3}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-indigo-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {translations.generatingBMC[language]}
                </>
              ) : (
                <>
                  <FileSparkles className="mr-2 h-5 w-5 text-indigo-300" />
                  {translations.generateBMC[language]} <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
