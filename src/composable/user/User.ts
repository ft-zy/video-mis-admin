
import {reactive} from "vue";
import {UserModel} from "@/api/user/UserType";


export default function User() {

    const addModel = reactive<UserModel>({
        uid: '',
        username: '',
        password: '',
        state: '',
        netName: '',
        email: '',
        uportrait: '',
        type: ''
    })

    const rules = {
        netName: [{
            required: true,
            message: '请填写用户名',
            trigger: 'change'
        }],
        password: [{
            required: true,
            message: '请填写密码',
            trigger: 'change'
        }],
        email: [{
            required: true,
            message: '请填写密码',
            trigger: 'change'
        }],
        username: [{
            required: true,
            message: '请填写密码',
            trigger: 'change'
        }],
    }

    return {
        addModel,
        rules
    }
}