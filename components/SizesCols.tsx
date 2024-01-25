"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Trash } from "lucide-react"

import { Button } from "./ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Sizes = {
  name: string
  value: string
  createdAt: string
}

export const sizesColumns: ColumnDef<Sizes>[] = [
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
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex">
          <Button>
            <Trash />
          </Button>
        </div>
      )
    },
  },
]
