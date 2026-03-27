
import{format } from "date-fns"

export function formatDate(date:string){
    return format(date,"yyyy-MM-dd")
}

export function formatDateDDMMYYYY(date:string){
   const [day,month,year] = date.split("-")
   return `${year}-${month}-${day}`
  
}
                   










