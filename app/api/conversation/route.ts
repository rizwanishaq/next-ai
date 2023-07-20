import { HfInference } from '@huggingface/inference'
import { NextResponse } from 'next/server'

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)



export async function POST(req) {
    try {
        const body = await req.json()
        const {messages} = body;
        console.log(messages)
        let history = [""];
        let generated = [""];
        const response = await hf.conversational({
            model: "microsoft/DialoGPT-large",
        inputs: {
            past_user_inputs: history,
            generated_responses: generated,
            text: `${messages}`
        }
        });
    
    return NextResponse.json(response)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", {status: 500})
    }
}
