import {LoginApi} from "@/api/login/Login";
import {setAid, setAportrait, setRoId, setToken} from "@/utils/auth";
import {message} from "ant-design-vue";
import LoginCheck from "@/composable/login/LoginCheck";
import {useForm} from "ant-design-vue/lib/form";
import {useRouter} from "vue-router";
import VerfiyCode from "@/composable/login/VerfiyCode";

export default function AdminLogin() {

    const router = useRouter();

    const { captcha, getCaptcha1, verKey } = VerfiyCode();

    const {loginModel, rules } = LoginCheck();

    const { validate, validateInfos, clearValidate } = useForm(loginModel, rules)

    const loginBtn = () => {
        validate().then(async () => {
            let res = await LoginApi(loginModel)
            if (res && res.code === 200 ) {
                setToken(res.data.token);
                setAid(res.data.aid)
                setRoId(res.data.roId)
                setAportrait(res.data.aportrait)
                //跳转到首页
                await router.push({path: "/"});
            }
            if (res && res.code == 200) {
                message.success(res.msg);
            }
            if (res && res.code == 666) {
                message.error(res.msg)
            }
        })
    }

//重置按钮
    const resetBtn = () => {
        loginModel.account = "";
        loginModel.apassword = "";
        clearValidate();
    };

    return {
        router,loginModel, rules,
        captcha, getCaptcha1, verKey,
        validate, validateInfos, clearValidate,
        loginBtn,resetBtn
    }
}