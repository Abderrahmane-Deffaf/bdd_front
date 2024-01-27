import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
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
  type,
}: {
  values: string[]
  placeholder: string
  label: string
  field: any
  type: string
}) => {
  return (
    <FormItem className="relative w-full">
      <FormLabel htmlFor={label} className="text-white  ">
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger
              id={label}
              className={`rounded-lg text-white ${
                type == "product" && "h-[5rem]"
              }  flex gap-4 overflow-hidden   p-[0.65rem]  `}
            >
              <SelectValue className="text-white" placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>

          <SelectContent>
            {values.map((Element, index) => (
              <SelectItem
                className="flex gap-4 capitalize"
                key={index}
                value={Element?.id + ""}
              >
                {type == "product" ? (
                  <div className="flex gap-4 items-center">
                    <span>{Element?.name}</span>
                    <span>{Element?.price}</span>
                    <img
                      className="h-[4rem] object-fit object-center w-[4rem]"
                      src={Element?.imgUrl}
                    />
                  </div>
                ) : (
                  <span>{Element?.name}</span>
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormLabel>
    </FormItem>
  )
}

export default SelectField
