
import {reactive} from "vue";
import {UserModel} from "@/api/user/UserType";
import {MsgModel} from "@/api/msg/MsgType";


export default function Msg() {

    const addModel = reactive<MsgModel>({
        id: '',
        title: '',
        info: '',
        date: '',
        type: ''
    })

    const rules = {
        title: [{
            required: true,
            message: '请输入发布内容',
            trigger: 'change'
        }],
        date: [{
            required: true,
            message: '请输入发布内容',
            trigger: 'change'
        }],
        info: [{
            required: true,
            message: '请输入发布内容',
            trigger: 'change'
        }],
    }

    return {
        addModel, rules
    }
}