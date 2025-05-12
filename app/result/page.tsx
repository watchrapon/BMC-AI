"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Edit, Printer, FileCheck } from "lucide-react"
import Link from "next/link"

// Import the language context and translations
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { LanguageToggle } from "@/components/language-toggle"
import { EditableSection } from "@/components/editable-section"

interface BMCData {
  businessName: string
  customerSegments: string[]
  valuePropositions: string[]
  channels: string[]
  customerRelationships: string[]
  revenueStreams: string[]
  keyResources: string[]
  keyActivities: string[]
  keyPartners: string[]
  costStructure: string[]
}

// Update the component to use translations and make sections editable
export default function ResultPage() {
  const [bmcData, setBmcData] = useState<BMCData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasChanges, setHasChanges] = useState(false)

  // Add the useLanguage hook
  const { language } = useLanguage()

  useEffect(() => {
    // Retrieve the BMC data from localStorage
    const storedData = localStorage.getItem("bmcData")
    if (storedData) {
      setBmcData(JSON.parse(storedData))
    }
    setIsLoading(false)
  }, [])

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    if (!bmcData) return

    // Create a text representation of the BMC
    const content =
      language === "th"
        ? `
# Business Model Canvas สำหรับ ${bmcData.businessName}

## กลุ่มลูกค้า
${bmcData.customerSegments.map((item) => `- ${item}`).join("\n")}

## คุณค่าที่นำเสนอ
${bmcData.valuePropositions.map((item) => `- ${item}`).join("\n")}

## ช่องทาง
${bmcData.channels.map((item) => `- ${item}`).join("\n")}

## ความสัมพันธ์กับลูกค้า
${bmcData.customerRelationships.map((item) => `- ${item}`).join("\n")}

## กระแสรายได้
${bmcData.revenueStreams.map((item) => `- ${item}`).join("\n")}

## ทรัพยากรหลัก
${bmcData.keyResources.map((item) => `- ${item}`).join("\n")}

## กิจกรรมหลัก
${bmcData.keyActivities.map((item) => `- ${item}`).join("\n")}

## พันธมิตรหลัก
${bmcData.keyPartners.map((item) => `- ${item}`).join("\n")}

## โครงสร้างต้นทุน
${bmcData.costStructure.map((item) => `- ${item}`).join("\n")}
      `
        : `
# Business Model Canvas for ${bmcData.businessName}

## Customer Segments
${bmcData.customerSegments.map((item) => `- ${item}`).join("\n")}

## Value Propositions
${bmcData.valuePropositions.map((item) => `- ${item}`).join("\n")}

## Channels
${bmcData.channels.map((item) => `- ${item}`).join("\n")}

## Customer Relationships
${bmcData.customerRelationships.map((item) => `- ${item}`).join("\n")}

## Revenue Streams
${bmcData.revenueStreams.map((item) => `- ${item}`).join("\n")}

## Key Resources
${bmcData.keyResources.map((item) => `- ${item}`).join("\n")}

## Key Activities
${bmcData.keyActivities.map((item) => `- ${item}`).join("\n")}

## Key Partners
${bmcData.keyPartners.map((item) => `- ${item}`).join("\n")}

## Cost Structure
${bmcData.costStructure.map((item) => `- ${item}`).join("\n")}
    `

    // Create a blob and download it
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${bmcData.businessName.replace(/\s+/g, "_")}_BMC.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Handle section updates
  const handleSectionUpdate = (section: keyof BMCData, items: string[]) => {
    if (!bmcData) return

    const updatedBmcData = {
      ...bmcData,
      [section]: items,
    }

    setBmcData(updatedBmcData)
    localStorage.setItem("bmcData", JSON.stringify(updatedBmcData))
    setHasChanges(true)

    // Show a temporary success message or notification
    setTimeout(() => {
      setHasChanges(false)
    }, 3000)
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  }

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030303]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-white/60">{translations.loading[language]}</p>
        </div>
      </div>
    )
  }

  if (!bmcData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030303]">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className="max-w-md w-full bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">{translations.noBMCFound[language]}</h2>
            <p className="text-white/60 mb-6">{translations.noBMCDescription[language]}</p>
            <Link href="/create">
              <Button className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200">
                {translations.createABMC[language]}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303] py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      {/* Decorative shapes */}
      <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-gradient-to-br from-rose-500/10 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-between items-center mb-8"
        >
          <Link href="/create">
            <Button className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {translations.backToForm[language]}
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <div className="flex gap-2">
              <Button
                onClick={handlePrint}
                className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
              >
                <Printer className="h-4 w-4 mr-2" />
                {translations.print[language]}
              </Button>
              <Button
                onClick={handleDownload}
                className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                {translations.download[language]}
              </Button>
              <Link href="/create">
                <Button className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200">
                  <Edit className="h-4 w-4 mr-2" />
                  {translations.edit[language]}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Success message when changes are saved */}
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-green-500/90 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 z-50"
          >
            <FileCheck className="h-5 w-5" />
            {language === "th" ? "บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว" : "Changes saved successfully"}
          </motion.div>
        )}

        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-white">{bmcData.businessName}</h1>
          <p className="text-white/60">{translations.businessModelCanvas[language]}</p>
        </motion.div>

        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 print:grid-cols-3"
        >
          {/* Left Column */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <EditableSection
                title={translations.keyPartners[language]}
                items={bmcData.keyPartners}
                onSave={(items) => handleSectionUpdate("keyPartners", items)}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <EditableSection
                title={translations.keyActivities[language]}
                items={bmcData.keyActivities}
                onSave={(items) => handleSectionUpdate("keyActivities", items)}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <EditableSection
                title={translations.keyResources[language]}
                items={bmcData.keyResources}
                onSave={(items) => handleSectionUpdate("keyResources", items)}
              />
            </motion.div>
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <EditableSection
                title={translations.valuePropositionsTitle[language]}
                items={bmcData.valuePropositions}
                onSave={(items) => handleSectionUpdate("valuePropositions", items)}
                gradient={true}
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <EditableSection
                title={translations.customerSegmentsTitle[language]}
                items={bmcData.customerSegments}
                onSave={(items) => handleSectionUpdate("customerSegments", items)}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <EditableSection
                title={translations.customerRelationships[language]}
                items={bmcData.customerRelationships}
                onSave={(items) => handleSectionUpdate("customerRelationships", items)}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <EditableSection
                title={translations.channels[language]}
                items={bmcData.channels}
                onSave={(items) => handleSectionUpdate("channels", items)}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 print:grid-cols-2"
        >
          <motion.div variants={itemVariants}>
            <EditableSection
              title={translations.costStructure[language]}
              items={bmcData.costStructure}
              onSave={(items) => handleSectionUpdate("costStructure", items)}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <EditableSection
              title={translations.revenueStreamsTitle[language]}
              items={bmcData.revenueStreams}
              onSave={(items) => handleSectionUpdate("revenueStreams", items)}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
