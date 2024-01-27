"use client"

import { useEffect, useState } from "react"
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
import SelectField from "@/components/SelectField"

const formSchema = z.object({
  address: z.string(),
  phone: z.string(),
  productId: z.any(),
  colorId: z.string(),
  sizeId: z.string(),
})

const CreateOrderPage = () => {
  const [products, setProducts] = useState([])
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])

  const { toast } = useToast()

  useEffect(() => {
    const getAvailableProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/products/available`
        )
        const data = res.data
        if (data) {
          setProducts(data)
          console.log(data)
        }
      } catch (e) {
        return null
      }
    }
    getAvailableProducts()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      phone: "",
      productId: null,
      colorId: "0",
      sizeId: "0",
    },
  })

  useEffect(() => {
    const getProductColors = async () => {
      console.log(form.getValues("productId"))
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/colors/product/8}`
        )
        const data = res.data
        if (data) {
          setColors(data)
          console.log(data)
        }
      } catch (e) {
        return null
      }
    }
    const getProductSizes = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/sizes/product/8`
        )
        const data = res.data
        if (data) {
          setSizes(data)
          console.log(data)
        }
      } catch (e) {
        return null
      }
    }
    getProductColors()
    getProductSizes()
  }, [form.formState.isDirty])
  console.log(form.getValues("productId"))

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/orders`,
        values
      )
      console.log(res.data)
      if (res.data?.message) {
        toast({
          description: res.data.message,
        })
      }
    } catch (e) {
      console.log(e)
      toast({
        description: "error",
      })
    }
  }
  function onError(e) {
    console.log(e)
  }
  return (
    <section className=" space-y-9">
      <div>
        <h1>Create order</h1>
        <p className=" text-gray-400">Add a new order</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-7 "
        >
          <div className="flex gap-9">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="your name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="your famaily name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <SelectField
                  field={field}
                  label="Products"
                  values={products}
                  type="product"
                  placeholder="choose a product"
                />
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <SelectField
                  field={field}
                  label="Colors"
                  values={colors}
                  type="color"
                  placeholder="choose a color"
                />
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <SelectField
                  field={field}
                  label="Sizes"
                  values={sizes}
                  type="size"
                  placeholder="choose a size"
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
      <Toaster />
    </section>
  )
}

export default CreateOrderPage
