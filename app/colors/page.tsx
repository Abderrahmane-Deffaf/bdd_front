import { colorsColumns } from "@/components/ColorsCols"
import { DataTable } from "@/components/DataTable"
import { sizesColumns } from "@/components/SizesCols"
import { getColors } from "@/components/datafetch"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function ColorsPage() {

  const data = await getColors()
  console.log(data)
  return (
    <section className=" space-y-9">
      {data && (
        <>
          <div className="flex justify-between ">
            <div className="flex flex-col gap-4">
              <h1>Colors ({data?.count})</h1>
              <p className=" text-gray-400">Mange colors for your store</p>
            </div>
            <div>
              <Link
                href="colors/create-color"
                className="flex items-center gap-2 rounded-lg bg-white p-2 text-black"
              >
                <Plus />
                Add new
              </Link>
            </div>
          </div>
          <DataTable columns={colorsColumns} data={data.sizes} />
        </>
      )}
    </section>
  )
}
