export const getDashboardInfo = async () => {
  try {
    const res = await fetch("https://api.npoint.io/bfe3a68aa1db20e6f04a")
    const data = await res.json()
    console.log(res)
    console.log(data)
    return data?.data ; 
  } catch (e) {
    return null
  }
}



export const getSizes = async () => {
  try {
    const res = await fetch("https://api.npoint.io/4cfa5d796f03ccb02a75")
    const data = await res.json()
    console.log(res)
    console.log(data)
    return data?.data ; 
  } catch (e) {
    return null
  }
}




export const getColors = async () => {
  try {
    const res = await fetch("https://api.npoint.io/4cfa5d796f03ccb02a75")
    const data = await res.json()
    console.log(res)
    console.log(data)
    return data?.data ; 
  } catch (e) {
    return null
  }
}


export const getProducts = async () => {
  try {
    const res = await fetch("https://api.npoint.io/247ca1429f61eb5480e3")
    const data = await res.json()
    console.log(res)
    console.log(data)
    return data?.data ; 
  } catch (e) {
    return null
  }
}
