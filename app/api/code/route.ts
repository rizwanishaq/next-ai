import { HfInference } from '@huggingface/inference'
import { NextResponse } from 'next/server'

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)



export async function POST(req) {
    try {
        const body = await req.json()
        const {messages} = body;
        console.log(messages)
        const response = await hf.textGeneration({
            model: "gpt2",
            inputs: `${messages}`
          })
    
    return NextResponse.json(response)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", {status: 500})
    }
}
