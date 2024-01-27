import axios from "axios"

export const getDashboardInfo = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/products/overview`
    )
    const data = res.data
    console.log(res)
    console.log(data)
    return data
  } catch (e) {
    return null
  }
}

export const getSizes = async (page: number, pageSize: number) => {
  console.log(page, pageSize)

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/sizes?page=${
        page + 1
      }&pageSize=${pageSize}`
    )
    console.log(res)
    const data = res.data
    console.log(data)
    return data
  } catch (e) {
    return null
  }
}

export const getColors = async (page: number, pageSize: number) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/colors?page=${
        page + 1
      }&pageSize=${pageSize}`
    )
    const data = res.data
    console.log(res)
    console.log(data)
    return data
  } catch (e) {
    return null
  }
}

export const getProducts = async (page: number, pageSize: number) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/products?page=${
        page + 1
      }&pageSize=${pageSize}`
    )
    const data = res.data
    return data
  } catch (e) {
    return null
  }
}

export const getOrders = async (page: number, pageSize: number) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/orders?page=${
        page + 1
      }&pageSize=${pageSize}`
    )
    const data = res.data
    return data
  } catch (e) {
    return null
  }
}
