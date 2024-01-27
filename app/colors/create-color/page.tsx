"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2),
  value: z.string(),
})

const CreateColorPage = () => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: "#ffffff",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/colors`,
        values
      )
      console.log(res)
      if (res.data?.message) {
        toast({
          description: res.data.message,
        })
        form.reset()
      }
    } catch (e) {
      console.log(e)
      toast({
        description: "error",
      })
    }
  }
  return (
    <section className=" space-y-9">
      <div>
        <h1>Create color</h1>
        <p className=" text-gray-400">Add a new color</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-7 "
        >
          <div className="flex gap-9">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="color name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button
            className="w-fit px-5 font-bold"
            variant="secondary"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Create
          </Button>
        </form>
      </Form>
      <Toaster />
    </section>
  )
}

export default CreateColorPage
