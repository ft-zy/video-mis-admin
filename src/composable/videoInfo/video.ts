import {reactive} from "@vue/reactivity";
import {VideoModel} from "@/api/video/VideoType";

export default function video() {

    const addModel = reactive<VideoModel>({
        vid:'',
        id: [],
        rid: [],
        yid: [],
        vname: '',
        vphoto: '',
        vinfo: '',
        vurl: "",
        type: '',
    })

    const rules = {
        id: [{
            required: true,
            message: '请选择视频类型',
            trigger: 'change'
        }],
        rid: [{
            required: true,
            message: '请选择视频地区',
            trigger: 'change'
        }],
        yid: [{
            required: true,
            message: '请选择视频年份',
            trigger: 'change'
        }],
        vname: [{
            required: true,
            message: '请输入视频名称',
            trigger: 'change'
        }],
        vinfo: [{
            required: true,
            message: '请填写视频简介',
            trigger: 'change'
        }],
        vphoto: [{
            required: false,
            message: '请选择视频上传封面',
            trigger: 'change'
        }],
        vurl: [{
            required: true,
            message: '请选择视频上传',
            trigger: 'change'
        }]
    }

    return {
        addModel,
        rules
    }

}