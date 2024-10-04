import {useState, useEffect} from 'react'

const useUserData = async() => {
    const [userData, setUserData] = useState(null)
    useEffect(()=>{
        getUser()
    },[])
    async function getUser(){
        
    }
}