import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const SelectField = ({
  values,
  placeholder,
  label,
  field,
}: {
  values: string[]
  placeholder: string
  label: string
  field: any
}) => {
  return (
    <FormItem className="relative w-full">
      <FormLabel
        htmlFor={label}
        className="text-white  "
      >
        
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger
              id={label}
              className="rounded-lg  p-[0.65rem]  "
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>

          <SelectContent>
            {values.map((Element, index) => (
              <SelectItem className=" capitalize" key={index} value={Element}>
                {Element}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormLabel>
    </FormItem>
  )
}

export default SelectField