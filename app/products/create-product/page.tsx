"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import ImageInput from "@/components/ImageInput"

const CreateProductPage = () => {
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  useEffect(() => {
    const getAllSizes = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/sizes/all`)
        const data = res.data
        if (data) {
          setSizes(data)
        }
      } catch (e) {
        return null
      }
    }
    const getAllColors = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/colors/all`)
        const data = res.data
        if (data) {
          setColors(data)
        }
      } catch (e) {
        return null
      }
    }
    getAllSizes()
    getAllColors()
  }, [])
  const { toast } = useToast()

  const form = useForm<any>()
  async function onSubmit(values: any) {
    // removing undifined values
    const newValues = Object.entries(values).filter(
      (element) => element[1] && element
    )
    const sizes = newValues.filter(
      (element) => element[0].includes("size") && element
    )
    const colors = newValues.filter(
      (element) => element[0].includes("color") && element
    )

    // getting red of sizes and colors
    const valuesNoSizes = newValues.filter(
      (element) => !sizes.includes(element)
    )
    const valuesNoColors = valuesNoSizes.filter(
      (element) => !colors.includes(element)
    )
    const sizesIds = sizes.map((Element) => +Element[0][0])
    const colorsIds = colors.map((Element) => +Element[0][0])

    const formData = new FormData()
    formData.append("sizeIds", JSON.stringify(sizesIds))
    formData.append("colorIds", JSON.stringify(colorsIds))

    valuesNoColors.map((Element) => {
      if (Element[0] == "image") {
        formData.append("image", values.image, values.image?.name)
      } else {
        formData.append(Element[0], Element[1])
      }
    })

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/products`,
        formData
      )
      if (res.data?.message) {
        toast({
          description: res.data.message,
        })
        form.reset()
      }
    } catch (e) {
      toast({
        description: "error",
      })
    }
  }

  function onError(e: any) {
    console.log(e)
  }

  return (
    <section className=" space-y-9">
      <div>
        <h1>Create product</h1>
        <p className=" text-gray-400">Add a new product</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
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
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex  gap-4">
            {sizes.map((Element, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`${Element?.id}size`}
                render={({ field }) => (
                  <FormItem className="flex  flex-row items-start gap-1 rounded-lg border p-2 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="capitalize">
                      {Element?.value}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="flex  gap-4">
            {colors.map((Element, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`${Element?.id}color`}
                render={({ field }) => (
                  <FormItem className="flex  flex-row items-start gap-1 rounded-lg border p-2 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel
                      style={{ color: Element?.value }}
                      className={`   capitalize`}
                    >
                      {Element?.name}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
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

export default CreateProductPage
