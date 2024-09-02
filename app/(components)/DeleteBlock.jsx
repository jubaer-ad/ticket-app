"use client"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {useRouter} from "next/navigation"

const DeleteBlock = ({id}) => {
  const router = useRouter()
  const handleOnClick = async () => {
    const rsp = await fetch(`/api/Tickets/${id}`, {
      method: "DELETE"
    })
    if (rsp.ok) {
      router.refresh()
    }
  }
  
  return (
    <FontAwesomeIcon icon={faX} className="text-red-500 hover:text-red-300" onClick={handleOnClick}/>
  )
}

export default DeleteBlock