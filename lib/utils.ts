import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateString(dateString: string) {
  const date = new Date(dateString)

  // Get day, month, and year
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0") // Month is zero-based
  const year = date.getFullYear()

  // Concatenate the formatted date
  const formattedDate = `${day}/${month}/${year}`

  return formattedDate
}
