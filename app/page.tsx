"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, BookOpen } from "lucide-react"

// Import the language context and translations
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { LanguageToggle } from "@/components/language-toggle"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

// Update the Home component to use translations
export default function Home() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  // Add the useLanguage hook
  const { language } = useLanguage()

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-white/10 text-white p-2 rounded-lg">
            <BookOpen size={24} className="text-indigo-300" />
          </div>
          <h1 className="text-2xl font-bold text-white">{translations.appName[language]}</h1>
        </div>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <Link href="/create">
            <Button
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
            >
              {translations.getStarted[language]} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-12 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
          >
            <Zap className="h-4 w-4 text-indigo-300" />
            <span className="text-sm text-white/60 tracking-wide">{translations.badge[language]}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                {translations.heroTitle1[language]}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 ",
                  pacifico.className,
                )}
              >
                {translations.heroTitle2[language]}
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              {translations.heroSubtitle[language]}
            </p>
          </motion.div>

          <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
            <Link href="/create">
              <Button
                size="lg"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
              >
                {translations.startBuildingBMC[language]} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* What is BMC Section */}
        <motion.div
          custom={4}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto mt-24 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
            {language === "th" ? "Business Model Canvas คืออะไร?" : "What is Business Model Canvas?"}
          </h2>
          <div className="text-white/70 space-y-4">
            <p>
              {language === "th"
                ? "Business Model Canvas (BMC) คือ การอธิบายองค์ประกอบของธุรกิจหรือโปรเจคซึ่งมีองค์ประกอบสำคัญ 9 ส่วน ในแบบที่เรียบง่ายบนหน้ากระดาษเพียงแผ่นเดียว เพื่อให้ทุกคนทั้งภายในและภายนอกองค์กรสามารถสื่อถึงสิ่งเดียวกันได้อย่างตรงประเด็น เข้าใจง่าย และนำไปใช้งานได้ทันที"
                : "Business Model Canvas (BMC) is a strategic management template for developing new or documenting existing business models. It's a visual chart with elements describing a firm's value proposition, infrastructure, customers, and finances, helping businesses align their activities by illustrating potential trade-offs."}
            </p>
            <p>
              {language === "th"
                ? "นอกจากจะทำให้การสื่อสารชัดเจนแล้ว จุดเด่นของ BMC คือ ทำให้เจ้าของทุกคนในโปรเจคสามารถเห็นภาพรวมของโครงการเพื่อจะปรับจุดอ่อนหรือเสริมจุดแข็งรวมไปถึงการปรับกลยุทธ์การดำเนินงานได้ง่ายและรวดเร็วอีกด้วย"
                : "The Business Model Canvas was proposed by Alexander Osterwalder based on his earlier work on Business Model Ontology. It offers a simple, visual way to understand and work through the fundamental elements of a business or product, helping teams align their activities by illustrating potential trade-offs."}
            </p>
          </div>
        </motion.div>

        {/* 9 Components Section */}
        <motion.div
          custom={5}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto mt-16 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
            {language === "th" ? "9 องค์ประกอบของ BMC" : "9 Components of BMC"}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="bg-indigo-500/20 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="text-indigo-300 font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {language === "th" ? "กลุ่มลูกค้า" : "Customer Segments"}
              </h3>
              <p className="text-white/60 text-sm">
                {language === "th" ? "ลูกค้าของเราคือใคร เราไปช่วยใคร" : "Who are your customers? Who are you helping?"}
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="bg-indigo-500/20 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="text-indigo-300 font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {language === "th" ? "คุณค่าของสินค้าและบริการ" : "Value Propositions"}
              </h3>
              <p className="text-white/60 text-sm">
                {language === "th"
                  ? "เราให้อะไรกับลูกค้าหรือเราไปช่วยลูกค้าของเราในเรื่องใด"
                  : "What value do you deliver to the customer?"}
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="bg-indigo-500/20 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="text-indigo-300 font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {language === "th" ? "ช่องทางการเข้าถึงลูกค้า" : "Channels"}
              </h3>
              <p className="text-white/60 text-sm">
                {language === "th" ? "ลูกค้าเจอเราได้ช่องทางไหน" : "How do you reach your customers?"}
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="bg-indigo-500/20 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="text-indigo-300 font-bold">4</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {language === "th" ? "ความสัมพันธ์กับลูกค้า" : "Customer Relationships"}
              </h3>
              <p className="text-white/60 text-sm">
                {language === "th" ? "ทำอย่างไรให้ลูกค้าติดใจเรา" : "How do you interact with your customers?"}
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="bg-indigo-500/20 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="text-indigo-300 font-bold">5</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{language === "th" ? "รายรับ" : "Revenue Streams"}</h3>
              <p className="text-white/60 text-sm">
                {language === "th" ? "รายได้" : "How does your business earn money?"}
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="bg-indigo-500/20 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="text-indigo-300 font-bold">6</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {language === "th" ? "รายจ่าย ต้นทุน" : "Cost Structure"}
              </h3>
              <p className="text-white/60 text-sm">
                {language === "th" ? "รายจ่าย" : "What are the costs in your business?"}
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="bg-indigo-500/20 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="text-indigo-300 font-bold">7</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {language === "th" ? "ทรัพยากรหลัก" : "Key Resources"}
              </h3>
              <p className="text-white/60 text-sm">
                {language === "th" ? "เราต้องใช้อะไร" : "What resources do you need?"}
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="bg-indigo-500/20 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="text-indigo-300 font-bold">8</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {language === "th" ? "กิจกรรมหลัก" : "Key Activities"}
              </h3>
              <p className="text-white/60 text-sm">{language === "th" ? "เราต้องทำอะไร" : "What must you do?"}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="bg-indigo-500/20 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="text-indigo-300 font-bold">9</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{language === "th" ? "ผู้ร่วมงานหลัก" : "Key Partners"}</h3>
              <p className="text-white/60 text-sm">{language === "th" ? "ใครจะมาเป็นตัวช่วยเรา" : "Who will help you?"}</p>
            </div>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          custom={6}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto mt-16 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
            {translations.howItWorks[language]}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{translations.step1Title[language]}</h3>
              <p className="text-white/60">{translations.step1Description[language]}</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{translations.step2Title[language]}</h3>
              <p className="text-white/60">{translations.step2Description[language]}</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{translations.step3Title[language]}</h3>
              <p className="text-white/60">{translations.step3Description[language]}</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          custom={7}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto mt-16 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">{translations.readyToBuild[language]}</h2>
          <p className="text-lg text-white/40 mb-8 max-w-2xl mx-auto">{translations.ctaDescription[language]}</p>
          <Link href="/create">
            <Button
              size="lg"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-200"
            >
              {translations.createBMCNow[language]} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
}
