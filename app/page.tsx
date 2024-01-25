import { getDashboardInfo } from "@/components/datafetch"

export default async function IndexPage() {
  let data = await getDashboardInfo()
  console.log(Object.entries(data))
  if (data) data = Object.entries(data)
  return (
    <section className=" space-y-9">
      <div>
        <h1>Dashboard</h1>
        <p className=" text-gray-400">Overview of your store</p>
      </div>
      <div className="flex justify-between">
        {data && (
        <>
          {data.map((element, index) => (
            <div
              key={index}
              className="flex basis-[32%] justify-between rounded-lg border p-5"
            >
              <p>{element[0]}</p>
              <p>{element[1]}</p>
            </div>
          ))}
        </>
      )}
      </div>
      
    </section>
  )
}
