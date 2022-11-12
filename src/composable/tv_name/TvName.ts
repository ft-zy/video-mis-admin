import {reactive} from "vue";
import {TvNameModel} from "@/api/tv_name/TvNameType";

export default function TvName() {

    const addModel = reactive<TvNameModel>({
        tvid: '',
        rid:[],
        id:[],
        yid:[],
        name: '',
        cover: '',
        info: '',
        type: ''
    })

    const rules = {
        name: [{
            required: true,
            message: '请填写动漫名',
            trigger: 'change'
        }],
        id: [{
            required: true,
            message: '请选择动漫类型',
            trigger: 'change'
        }],
        rid: [{
            required: true,
            message: '请选择动漫地区',
            trigger: 'change'
        }],
        yid: [{
            required: true,
            message: '请选择动漫年份',
            trigger: 'change'
        }],
        info: [{
            required: true,
            message: '请填写动漫简介',
            trigger: 'change'
        }],
    }

    return {
        addModel, rules
    }
}