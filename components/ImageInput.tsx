import { useEffect, useState } from "react"

import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const ImageInput = ({ field }) => {
  const [preview, setPreview] = useState("")
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
          <Image
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
            if (file) {
              const reader = new FileReader()
              reader.onloadend = () => {
                setPreview(reader?.result as string)
              }
              reader.readAsDataURL(file)
            } else {
              setPreview(defaultImage)
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
