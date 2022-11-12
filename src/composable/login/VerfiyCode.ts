import { captcha1Api, captcha2Api, captcha3Api, captcha4Api, captcha5Api } from "@/api/login/Verify";
import axios from "axios";
import {onMounted, reactive, ref} from "vue";
export default function VerfiyCode() {

    const verKey = reactive({
        list: ''
    })

    const captcha = reactive({
        list: []
    })

    const getCaptcha1 = async () => {
        let res = await captcha1Api()
        if (res && res.data.key == res.data.key) {
            verKey.list = res.data.key
            captcha.list = res.data.base64;
        }
    }

    const getCaptcha2 = async () => {
        let res = await captcha2Api()
        console.log(res.data);
        if (res && res.code == 200) {
            captcha.list = JSON.parse(res.data).base64;
        }
    }

    const base = ()=> {
        axios.get('http://localhost:8088/api/captcha3').then((res) => {
            captcha.list = res.data.base64
                console.log("++++++++++++++++++++++++++++++++++++");
                console.log(res.data.base64)
                console.log("++++++++++++++++++++++++++++++++++++");
            })
      }


    const getCaptcha3 = async () => {
        let res = await captcha3Api()
        console.log("-=-----------------------------------------------");
        // console.log(JSON.parse(res.data).base64.split('image/')[1])
        // console.log(JSON.parse(res.data).code)
        console.log(res.data);

        console.log("-=-----------------------------------------------");

        if (res && res.code == 200) {
            captcha.list = JSON.parse(res.data).base64;
        }
    }



    const getCaptcha4 = async () => {
        let res = await captcha4Api()
        console.log(res.data);

        if (res && res.code == 200) {
            captcha.list = JSON.parse(res.data).base64;
        }
    }

    const getCaptcha5 = async () => {
        let res = await captcha5Api()
        console.log(res.data);

        if (res && res.code == 200) {
            captcha.list = JSON.parse(res.data).base64;
        }
    }

    onMounted(() => {
        getCaptcha1()
        // base()
    })

    return {
        captcha,
        // base,
        getCaptcha1,
        // getCaptcha2,
        // getCaptcha1,
        // getCaptcha4,
        // getCaptcha5
        verKey
    }

}