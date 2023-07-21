"use client"
import axios from 'axios'
import * as z from "zod"
import { Download, ImageIcon} from "lucide-react"
import Heading from "../../../../components/heading"
import { useForm } from "react-hook-form"
import { formSchema } from "./constants"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "../../../../components/ui/form"
import { Input } from "../../../../components/ui/input"
import { Button } from "../../../../components/ui/button"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Empty from '../../../../components/empty'
import Loader from '../../../../components/loader'
import { cn } from '../../../../@/lib/utils'
import BotAvatar from '../../../../components/bot-avatar'
import UserAvatar from '../../../../components/user-avatar'
import { Card, CardFooter } from '../../../../components/ui/card'
import Image from 'next/image'



const ImagePage = () => {
    const router = useRouter()
    const [image_, setImage_] = useState("");
    const [prompt, setPrompt] = useState("")

    

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    })


    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values) => {
        try {
          setImage_("")
            const response = await axios.post("/api/image", {prompt: values.prompt})
            setImage_(response.data.imageUrl)
            setPrompt(values.prompt)
            form.reset();
        } catch (error) {
            console.log(error)
        } finally {
            router.refresh();
        }
    }



  return (
    <div>
        <Heading
        title="Image Generation"
        description="Turn your prompt into an image"
        Icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
        />
        <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="How do I calculate the radius of a circle?" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
            {isLoading && (
                <div className='p-20'><Loader /></div>
            )}
        </div>
        { image_ && (
          
           <div className='h-full flex flex-col gap-y-4 items-center'>
              <Card className='rounded-lg overflow-hidden'>
                <div className='relative aspect-square'>
                <Image width={512} height={512} alt="Uploaded Image"  src={`data:image/jpg;base64,${image_}`}/>
                </div>
                <CardFooter className='p-2'>
                  <p className='w-full text-sm text-muted-foreground' >
                    Prompt: {prompt}
                  </p>
                </CardFooter>
              </Card>
           </div>
        
        )

        }
        </div>
    </div>
  )
}

export default ImagePage