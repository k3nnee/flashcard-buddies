import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = "You are a flashcard creator, you take in and create multiple flashcards from it. Make sure to create exactly 10 flashcards" +
    "Both front and back should be one sentence long." +
    "1. Create clear and concise questions on the front of the card" +
    "2. Provide accurate and informative answers for the back of the card" +
    "3. Use simple language to make the flashcard accessible" +
    "4. Avoid overly complex or ambiguous phrasing in both question and answer" +
    "5. Only generate 10 flashcards" +
    "You should return in the following JSON format:" +
    `
    {
    "flashcards" : [
        {
            "front" : str,
            "back : str
        }
    ]
    }
    `;

export async function POST (req) {
    const openai = new OpenAI();
    const data = await req.text();

    //Openai API call
    const completion = await openai.chat.completions.create({
        messages : [
            {role: "system", content: systemPrompt},
            {role: "user", content: data}
        ],
        model: "gpt-4o-mini",
        response_format: {type: "json_object"}
    });
    //We use this when we are not streaming vs chunk.choices[0]?.delta.content
    //JSON.parse() is sync and .json() is async
    const flashcards = JSON.parse(completion.choices[0].message.content);

    //Returns JSON as a object
    return NextResponse.json(flashcards.flashcards);

}