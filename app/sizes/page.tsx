"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Toaster } from "@/components/ui/toaster"
import { DataTable } from "@/components/DataTable"
import { sizesColumns } from "@/components/SizesCols"
import { getSizes } from "@/components/datafetch"

export default async function SizesPage() {
  const [page, setPage] = useState(0)

  const data = await getSizes(page, 5)
  //console.log(data)

  return (
    <section className=" space-y-9">
      <div className="flex justify-between ">
        <div className="flex flex-col gap-4">
          <h1>Sizes {data?.count | 0}</h1>
          <p className=" text-gray-400">Mange sizes for your store</p>
        </div>
        <div>
          <Link
            href="sizes/create-size"
            className="flex items-center gap-2 rounded-lg bg-white p-2 text-black"
          >
            <Plus />
            Add new
          </Link>
        </div>
      </div>
      {data && (
        <DataTable
          columns={sizesColumns}
          data={data?.sizes || []}
          pageCount={Math.ceil((data?.count || 0) / 5)}
          pageIndex={page}
          pageSize={5}
          setPage={(page) => setPage(page)}
        />
      )}
      <Toaster />
    </section>
  )
}
