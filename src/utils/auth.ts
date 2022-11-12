import exp from "constants"

//存储token
export function setToken(token: string) {
    return sessionStorage.setItem("token", token)
}
export function getToken() {
    return sessionStorage.getItem("token")
}

//存储用户id
export function setAid(aid: string) {
    console.log(aid + "------------------")
    return sessionStorage.setItem("aid", aid)
}
export function getAid() {
    return sessionStorage.getItem("aid")
}

export function setRoId(roId: string) {
    console.log(roId + "------------------")
    return sessionStorage.setItem("roId", roId)
}
export function getRoId() {
    return sessionStorage.getItem("roId")
}

export function setAportrait(aportrait: string) {
    return sessionStorage.setItem("aportrait", aportrait)
}
export function getAportrait() {
    return sessionStorage.getItem("aportrait")
}

export function removeAid() {
    return sessionStorage.remove("aid")
}
//清空
export function clearSession() {
    return sessionStorage.clear()
}

// 存储用户类型
export function setUserType(userType: string) {
    return sessionStorage.setItem("userType", userType)
}
export function getUserType() {
    return sessionStorage.getItem("userType")
}