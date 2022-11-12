
import {reactive} from "vue";
import {TvInfoModel} from "@/api/tv/TvInfoType";

export default function TvInfo() {

    const addModel = reactive<TvInfoModel>({
        vid: '',
        tvid: [],
        count: '',
        vurl: '',
        type: ''
    })

    const rules = {
        tvid: [{
            required: true,
            message: '请填写动漫名',
            trigger: 'change'
        }],
        count: [{
            required: true,
            message: '请填写动漫集数',
            trigger: 'change'
        }],

    }

    return {
        addModel, rules
    }
}