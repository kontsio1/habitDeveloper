import axios from "axios"

const userApi = axios.create({baseURL: "http://localhost:3007"})

export const getUserData =({email,password})=>{
    // const email = "shudrea@gmail.com"
    // const password = "iLoveCake"
    // console.log(email,"<<<<email")
    // console.log(password,"<<<<password")
    return userApi.get(`/user/${email}/${password}`).then((res)=>{
        console.log(res.status)
        console.log(res.data[0].chalenges.Sl_1_NoPhoneBeforeBed)
            return res.data[0]
        }).catch((err)=>{
           return err
        })
}

export const patchUserChallenges =(username='Sergiu', chalCodeStr, bodyObj)=>{
    return userApi.patch(`/challenges/${username}`, {[chalCodeStr]: bodyObj}).then((res)=>{
        console.log(res.status)
        console.log(res.data[0],'<< patch complete')
            return res.data[0]
        }).catch((err)=>{
            console.log(err,"<<<<<err")
        })
}


export const postNewUser=(username,email,password)=>{
    const newUser = {
        username: username,
        email: email,
        password:password,
   }
    return userApi.post('/user', newUser).then((res)=>{
        console.log(res.status)
            return res.data[0]
        }).catch((err)=>{
            console.log(err,"<<<<<err")
        })
}