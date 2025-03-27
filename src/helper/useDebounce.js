import { useEffect } from "react"

function useDebounce() {
    useEffect(()=>{
        let timerId = setTimeout(async()=>{
            await functionToDebounce()
        },500)

        return ()=>clearTimeout(timerId)
    })
}

export default useDebounce