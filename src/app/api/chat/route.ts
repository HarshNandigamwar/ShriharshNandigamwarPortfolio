import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import fs from "fs";
import path from "path";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 1. Read your local data
    const filePath = path.join(process.cwd(), "/src/lib/data.txt");
    const fileContent = fs.readFileSync(filePath, "utf8");

    // 2. Simple Retrieval (Context matching)
    // For a basic version, we pass the relevant text sections.
    // If the file is small (< 4000 words), you can pass the whole thing as context.
    const context = fileContent;

    // 3. Call Groq with System Prompting
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for a portfolio. Answer questions based ONLY on this context: \n\n${context}`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.3-70b-versatile", // Or your preferred Groq model
    });

    const response =
      chatCompletion.choices[0]?.message?.content || "I'm not sure about that.";
    return NextResponse.json({ response });
  } catch (error) {
    console.error("RAG Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch response" },
      { status: 500 },
    );
  }
}
