"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Toaster } from "@/components/ui/toaster"
import { DataTable } from "@/components/DataTable"
import { ordersColumns } from "@/components/OrdersCols"
import { getOrders } from "@/components/datafetch"

export default async function OrdersPage() {
  const [page, setPage] = useState(0)
  const data = await getOrders(page, 5)

  console.log(data)

  return (
    <section className=" space-y-9">
      {data && (
        <>
          <div className="flex justify-between ">
            <div className="flex flex-col gap-4">
              <h1>Orders ({data?.count})</h1>
              <p className=" text-gray-400">Mange ordres for your store</p>
            </div>
            <div>
              <Link
                href="orders/create-order"
                className="flex items-center gap-2 rounded-lg bg-white p-2 text-black"
              >
                <Plus />
                Add new
              </Link>
            </div>
          </div>

          <DataTable
            columns={ordersColumns}
            data={data?.orders || []}
            pageCount={Math.ceil((data?.count || 0) / 5)}
            pageIndex={page}
            pageSize={5}
            setPage={(page) => setPage(page)}
          />
          <Toaster />
        </>
      )}
    </section>
  )
}
