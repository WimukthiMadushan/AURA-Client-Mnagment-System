"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface CompanyStatusDropdownProps {
  onChange: (date: Date) => void;
}

const DatePicker: React.FC<CompanyStatusDropdownProps> = ({ onChange }) => {
  const [date, setDate] = React.useState<Date>()
  const [open, setOpen] = React.useState<boolean>(false)

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date)
      onChange(date)
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-left font-medium transition-all",
            "border border-gray-300 dark:border-gray-600 rounded-lg",
            !date && "text-muted-foreground",
            "hover:border-pink-500 focus:ring-2 focus:ring-pink-500"
          )}
        >
          <CalendarIcon className="mr-2" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-auto p-0 mt-2 rounded-lg shadow-lg",
          "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600"
        )}
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          className="rounded-lg"
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
