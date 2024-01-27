"use client"

import { ColumnDef } from "@tanstack/react-table"
import axios from "axios"
import { Trash } from "lucide-react"

import { formatDateString } from "@/lib/utils"

import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Sizes = {
  id: number
  name: string
  value: string
  createdAt: string
}

export const sizesColumns: ColumnDef<Sizes>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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
                  `http://localhost:3000/api/v1/sizes/${row.original.id}`
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
