"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

interface FormData {
  businessName: string
  customerSegments: string
  valuePropositions: string
  revenueStreams: string
}

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

// Also update the prompt to support Thai language based on the language parameter
export async function generateBMC(formData: FormData, language = "en"): Promise<BMCData> {
  try {
    // Initialize the Google Generative AI client with the correct class name
    const genAI = new GoogleGenerativeAI("AIzaSyCOqvOEwENqbjr18V4MaKP3F3peXZkeUgs") // API key directly included

    // Create the prompt for the AI
    const prompt = `
      ${
        language === "th"
          ? `สร้าง Business Model Canvas ที่ครอบคลุมสำหรับธุรกิจที่มีรายละเอียดดังต่อไปนี้:
          
          ชื่อธุรกิจ: ${formData.businessName}
          กลุ่มลูกค้าเป้าหมาย: ${formData.customerSegments}
          คุณค่าที่นำเสนอ: ${formData.valuePropositions}
          กระแสรายได้: ${formData.revenueStreams || "กรุณาแนะนำกระแสรายได้ที่เหมาะสมตามประเภทธุรกิจ"}
          
          สำหรับแต่ละองค์ประกอบทั้ง 9 ของ Business Model Canvas ให้ระบุ 3-5 ข้อ จัดรูปแบบคำตอบเป็นอ็อบเจ็กต์ JSON ด้วยโครงสร้างต่อไปนี้:
          
          Business Model Canvas ประกอบด้วย 9 องค์ประกอบหลัก:
          1. กลุ่มลูกค้า (Customer Segments) - ลูกค้าของเราคือใคร เราไปช่วยใคร
          2. คุณค่าที่นำเสนอ (Value Propositions) - เราให้อะไรกับลูกค้าหรือเราไปช่วยลูกค้าของเราในเรื่องใด
          3. ช่องทาง (Channels) - ลูกค้าเจอเราได้ช่องทางไหน
          4. ความสัมพันธ์กับลูกค้า (Customer Relationships) - ทำอย่างไรให้ลูกค้าติดใจเรา
          5. กระแสรายได้ (Revenue Streams) - รายได้
          6. ทรัพยากรหลัก (Key Resources) - เราต้องใช้อะไร
          7. กิจกรรมหลัก (Key Activities) - เราต้องทำอะไร
          8. พันธมิตรหลัก (Key Partners) - ใครจะมาเป็นตัวช่วยเรา
          9. โครงสร้างต้นทุน (Cost Structure) - รายจ่าย ต้นทุน`
          : `Create a comprehensive Business Model Canvas for a business with the following details:
          
          Business Name: ${formData.businessName}
          Customer Segments: ${formData.customerSegments}
          Value Propositions: ${formData.valuePropositions}
          Revenue Streams: ${formData.revenueStreams || "Please suggest appropriate revenue streams based on the business type"}
          
          For each of the 9 components of the Business Model Canvas, provide 3-5 bullet points. Format your response as a JSON object with the following structure:
          
          The Business Model Canvas consists of 9 key components:
          1. Customer Segments - Who are our customers? Who are we helping?
          2. Value Propositions - What value do we deliver to the customer? What problems are we solving?
          3. Channels - How do customers find and access our offerings?
          4. Customer Relationships - How do we build and maintain relationships with customers?
          5. Revenue Streams - How do we generate income?
          6. Key Resources - What resources do we need?
          7. Key Activities - What activities must we perform?
          8. Key Partners - Who are our key partners and suppliers?
          9. Cost Structure - What are our major expenses?`
      }
      {
        ${
          language === "th"
            ? `"businessName": "ชื่อธุรกิจ",
          "customerSegments": ["ข้อ 1", "ข้อ 2", ...],
          "valuePropositions": ["ข้อ 1", "ข้อ 2", ...],
          "channels": ["ข้อ 1", "ข้อ 2", ...],
          "customerRelationships": ["ข้อ 1", "ข้อ 2", ...],
          "revenueStreams": ["ข้อ 1", "ข้อ 2", ...],
          "keyResources": ["ข้อ 1", "ข้อ 2", ...],
          "keyActivities": ["ข้อ 1", "ข้อ 2", ...],
          "keyPartners": ["ข้อ 1", "ข้อ 2", ...],
          "costStructure": ["ข้อ 1", "ข้อ 2", ...]`
            : `"businessName": "The business name",
          "customerSegments": ["bullet point 1", "bullet point 2", ...],
          "valuePropositions": ["bullet point 1", "bullet point 2", ...],
          "channels": ["bullet point 1", "bullet point 2", ...],
          "customerRelationships": ["bullet point 1", "bullet point 2", ...],
          "revenueStreams": ["bullet point 1", "bullet point 2", ...],
          "keyResources": ["bullet point 1", "bullet point 2", ...],
          "keyActivities": ["bullet point 1", "bullet point 2", ...],
          "keyPartners": ["bullet point 1", "bullet point 2", ...],
          "costStructure": ["bullet point 1", "bullet point 2", ...]`
        }
      }
      
      ${
        language === "th"
          ? `ตรวจสอบให้แน่ใจว่าคำแนะนำทั้งหมดสมจริง ปฏิบัติได้จริง และปรับให้เข้ากับประเภทธุรกิจเฉพาะ ให้มีความคิดสร้างสรรค์แต่มุ่งเน้นธุรกิจ
        ตอบกลับด้วยอ็อบเจ็กต์ JSON เท่านั้น ไม่มีข้อความเพิ่มเติม และตอบเป็นภาษาไทยทั้งหมด`
          : `Make sure all the suggestions are realistic, practical, and tailored to the specific business type. Be creative but business-focused.
        Only respond with the JSON object, no additional text.`
      }
    `

    // Configure the model - using the correct model name from the user's example
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    // Generate content
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    // Extract the JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const jsonString = jsonMatch ? jsonMatch[0] : text

    // Parse the JSON response
    const bmcData: BMCData = JSON.parse(jsonString)
    return bmcData
  } catch (error) {
    console.error("Error generating BMC:", error)

    // Fallback data in case of error
    const fallbackData = {
      businessName: formData.businessName,
      customerSegments: [formData.customerSegments],
      valuePropositions: [formData.valuePropositions],
      channels:
        language === "th"
          ? ["ช่องทางออนไลน์", "การขายตรง", "พันธมิตร"]
          : ["Online channels", "Direct sales", "Partnerships"],
      customerRelationships:
        language === "th"
          ? ["การช่วยเหลือส่วนบุคคล", "บริการตนเอง", "ชุมชน"]
          : ["Personal assistance", "Self-service", "Community"],
      revenueStreams: formData.revenueStreams
        ? [formData.revenueStreams]
        : language === "th"
          ? ["การขายสินค้า", "ค่าสมาชิกรายเดือน"]
          : ["Product sales", "Subscription fees"],
      keyResources:
        language === "th"
          ? ["ทรัพยากรบุคคล", "ทรัพย์สินทางปัญญา", "ทรัพยากรทางการเงิน"]
          : ["Human resources", "Intellectual property", "Financial resources"],
      keyActivities:
        language === "th" ? ["การผลิต", "การแก้ปัญหา", "การตลาด"] : ["Production", "Problem solving", "Marketing"],
      keyPartners:
        language === "th"
          ? ["ซัพพลายเออร์", "พันธมิตรเชิงกลยุทธ์", "ผู้จัดจำหน่าย"]
          : ["Suppliers", "Strategic alliances", "Distributors"],
      costStructure:
        language === "th"
          ? ["ต้นทุนคงที่", "ต้นทุนผันแปร", "การประหยัดต่อขนาด"]
          : ["Fixed costs", "Variable costs", "Economies of scale"],
    }

    return fallbackData
  }
}
