import { HfInference } from '@huggingface/inference'
import { NextResponse } from 'next/server'
import { increaseApiLimit, checkApiLimit } from '../../../lib/api-limit'


const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)



export async function POST(req) {
    try {
        const body = await req.json()
        const {messages} = body;
        
        const freeTrial = await checkApiLimit();

        if(!freeTrial) {
            return new NextResponse("Api limit reached", {status: 403})
        }

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

        await increaseApiLimit()
    
    return NextResponse.json(response)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", {status: 500})
    }
}
