"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";



import { Button } from "./ui/button";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  name: string
  price: number
  size: string
  color: string 
  createdAt: string
}

export const productsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
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