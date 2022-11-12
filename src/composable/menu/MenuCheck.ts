import { reactive } from "vue";

export default function MenuCheck() {
    const addModel = reactive({
        mid:'',
        parentId:'',
        title: '',
        code: '',
        name:'',
        path:'',
        url:'',
        type:'',
        icon:'',
        parentName:'',
        orderNum: '',
        num: '',
        editType: ''
    })

    const rules = reactive({
        parentName: [{
            required: true,
            message: '请选择上级菜单',
            trigger: 'change'
        }],
        title: [{
            required: true,
            message: '请填写菜单名称',
            trigger: 'change'
        }],
        code: [{
            required: true,
            message: '请填写权限字段',
            trigger: 'change'
        }],
        name: [{
            required: false,
            message: '请填写路由名称',
            trigger: 'change'
        }],
        path: [{
            required: false,
            message: '请填写路由path',
            trigger: 'change'
        }],
        url: [{
            required: false,
            message: '请填写路由url',
            trigger: 'change'
        }],
        type: [{
            required: true,
            message: '请选择菜单类型',
            trigger: 'change'
        }],
    })

    return {
        addModel,
        rules
    }
}