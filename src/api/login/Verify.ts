import http from "@/http"

export const captcha1Api = () => {
    return http.get({
        url:'/api/captcha1'
    })
}

export const captcha2Api = () => {
    return http.get({
        url:'/api/captcha2'
    })
}

export const captcha3Api = () => {
    return http.get({
        url:'/api/captcha3'
    })
}

export const captcha4Api = () => {
    return http.get({
        url:'/api/captcha4'
    })
}

export const captcha5Api = () => {
    return http.get({
        url:'/api/captcha5'
    })
}