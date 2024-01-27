import { getDashboardInfo } from "@/components/datafetch"

export default async function IndexPage() {
  const data = await getDashboardInfo()

  return (
    <section className=" space-y-9">
      <div>
        <h1>Dashboard</h1>
        <p className=" text-gray-400">Overview of your store</p>
      </div>
      <div className="flex gap-5">
        <div className="flex basis-[32%] justify-between rounded-lg border p-5 text-xl">
          <p>Orders Count</p>
          <p>{data?.ordersCount}</p>
        </div>
        <div className="flex basis-[32%] justify-between rounded-lg border p-5 text-xl">
          <p>Products Count</p>
          <p>{data?.productsCount}</p>
        </div>
      </div>
    </section>
  )
}
