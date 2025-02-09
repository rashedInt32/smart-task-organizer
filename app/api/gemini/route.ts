import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
  systemInstruction: process.env.SYSTEM_INSTRUCTIONS,
})

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const result = await model.generateContent(
      prompt + `, today's date ${new Date()}`
    )

    console.log(result)

    return NextResponse.json({ response: result.response.text() })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
