import Link from "next/link"
import { Plus } from "lucide-react"

import { DataTable } from "@/components/DataTable"
import { sizesColumns } from "@/components/SizesCols"
import { getSizes } from "@/components/datafetch"

export default async function SizesPage() {
  const data = await getSizes()
  console.log(data)

  return (
    <section className=" space-y-9">
      {data && (
        <>
          <div className="flex justify-between ">
            <div className="flex flex-col gap-4">
              <h1>Sizes ({data?.count})</h1>
              <p className=" text-gray-400">Mange sizes for your store</p>
            </div>
            <div>
              <Link href="sizes/create-size" className="flex items-center gap-2 rounded-lg bg-white p-2 text-black" >
                <Plus />
                Add new
              </Link>
            </div>
          </div>
          <DataTable columns={sizesColumns} data={data.sizes} />
        </>
      )}
    </section>
  )
}
