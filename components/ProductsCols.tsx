"use client"

import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import axios from "axios"
import { Trash } from "lucide-react"

import { formatDateString } from "@/lib/utils"

import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: number
  name: string
  price: number
  imgUrl: string
  createdAt: string
  color: string
  quantity: number
}

export const productsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "imgUrl",
    header: "Image",
    cell: ({ row }) => {
      console.log(row.original.imgUrl)

      return (
        <div className="h-[10rem] overflow-hidden p-4 w-[15rem]">
          <img
            className="object-fit object-center "
            src={row.original.imgUrl}
            alt="product"
          />
        </div>
      )
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const formattedDate = formatDateString(row.original.createdAt)

      return <>{formattedDate}</>
    },
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const { toast } = useToast()
      return (
        <div className="flex">
          <Button
            onClick={async () => {
              try {
                const res = await axios.delete(
                  `http://localhost:3000/api/v1/products/${row.original.id}`
                )
                console.log(res)
                if (res.data?.message) {
                  toast({
                    description: res.data.message,
                  })
                }
              } catch (e) {
                console.log(e)
              }
            }}
          >
            <Trash />
          </Button>
        </div>
      )
    },
  },
]
