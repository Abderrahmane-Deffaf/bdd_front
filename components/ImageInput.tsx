"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import deafultImage from "@/public/type1a.png"

import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const ImageInput = ({ field }) => {
  const [preview, setPreview] = useState<any>(null)
  // create a preview from the initial image
  useEffect(() => {
    if (field?.value) {
      setPreview(field?.value)
    }
  }, [field?.value])
  return (
    <FormItem>
      <FormLabel
        htmlFor={field?.name}
        className="  text-white   relative   flex  h-[17rem] w-[20rem] cursor-pointer items-center justify-center rounded-2xl border  p-4 "
      >
        <span className="absolute -top-[5%] left-[10%]  z-20 bg-black px-[0.2rem]  capitalize">
          {field?.name}
        </span>
        <div className="size-[95%]  overflow-hidden">
          <img
            className="size-full object-scale-down"
            src={preview}
            alt="preview"
          />
        </div>
      </FormLabel>
      <FormControl>
        <Input
          className="hidden"
          multiple
          onChange={(event) => {
            const file = event?.target.files?.[0]
            console.log(file)

            if (file) {
              const reader = new FileReader()
              reader.onloadend = () => {
                console.log(reader?.result)

                setPreview(reader?.result as string)
              }
              reader.readAsDataURL(file)
            } else {
              setPreview(deafultImage)
            }
            field?.onChange(event?.target?.files[0])
          }}
          accept="image/*"
          type="file"
          id={field?.name}
          name={field?.name || "image"}
        />
      </FormControl>
    </FormItem>
  )
}

export default ImageInput
