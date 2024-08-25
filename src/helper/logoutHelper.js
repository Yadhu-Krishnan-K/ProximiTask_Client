import {jwtDecode} from 'jwt-decode'

function logOutHeloper(role){
    console.log('inside logOutHeloper')
    const accessTokens = JSON.parse(localStorage.getItem('accessTokens'))
    console.log('accessTokens == ',accessTokens)
    if(accessTokens.length == 1){
        localStorage.clear()
    }else{
        let pos
        for(let i=0;i<accessTokens.length;i++){
            const decoded = jwtDecode(accessTokens[i])
            if(decoded.role == role){
                pos = i
                break
            }
        }
        accessTokens.splice(pos, 1)
        localStorage.setItem('accessTokens', JSON.stringify(accessTokens))
    }

}

export default logOutHeloper