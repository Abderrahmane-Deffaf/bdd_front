"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Toaster } from "@/components/ui/toaster"
import { DataTable } from "@/components/DataTable"
import { productsColumns } from "@/components/ProductsCols"
import { getProducts } from "@/components/datafetch"

export default async function ProductsPage() {
  const [page, setPage] = useState(0)

  const data = await getProducts(page, 5)
  //console.log(data)

  return (
    <section className=" space-y-9">
      <div className="flex justify-between ">
        <div className="flex flex-col gap-4">
          <h1>Products ({data?.count})</h1>
          <p className=" text-gray-400">Mange sizes for your store</p>
        </div>
        <div>
          <Link
            href="products/create-product"
            className="flex items-center gap-2 rounded-lg bg-white p-2 text-black"
          >
            <Plus />
            Add new
          </Link>
        </div>
      </div>
      <DataTable
        columns={productsColumns}
        data={data?.products || []}
        pageCount={Math.ceil((data?.count || 0) / 5)}
        pageIndex={page}
        pageSize={5}
        setPage={(page) => setPage(page)}
      />
      <Toaster />
    </section>
  )
}
