"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
import ImageInput from "@/components/ImageInput"
import SelectField from "@/components/SelectField"

const formSchema = z.object({
  name: z.string().min(2),
  price: z.number().min(2),
  size: z.string().min(2),
  color: z.string().min(2),
  image: z.any(),
})

const CreateProductPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      price: 0,
      size: "",
      color: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <section className=" space-y-9">
      <div>
        <h1>Create product</h1>
        <p className=" text-gray-400">Add a new product</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-7 "
        >
          <div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => <ImageInput field={field} />}
            />
          </div>
          <div className="flex gap-9">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="size name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-9">
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <SelectField
                  values={["size1", "size2"]}
                  label="Size"
                  placeholder="size"
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <SelectField
                  values={["color1", "color2"]}
                  label="Color"
                  placeholder="color"
                  field={field}
                />
              )}
            />
          </div>
          <Button
            className="w-fit px-5 font-bold"
            variant="secondary"
            type="submit"
          >
            Create
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default CreateProductPage
