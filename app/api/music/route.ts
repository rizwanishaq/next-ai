import { NextResponse } from 'next/server'
import Replicate from 'replicate'


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
})

export async function POST(req) {
    try {
        const {prompt} = await req.json()
        
        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
              input: {
                prompt_a: `${prompt}`
              }
            }
          );
    return NextResponse.json(response)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", {status: 500})
    }
}
