import {reactive} from "vue";
import {AnimeNameModel} from "@/api/anime_name/AnimeNameType";
import {AnimeModel} from "@/api/anime/AnimeType";

export default function Anime() {

    const addModel = reactive<AnimeModel>({
        avid: '',
        aid: [],
        count: '',
        vurl: '',
        type: ''
    })

    const rules = {
        aid: [{
            required: true,
            message: '请选择动漫名',
            trigger: 'change'
        }],
        count: [{
            required: true,
            message: '请填写集数',
            trigger: 'change'
        }],
    }

    return {
        addModel, rules
    }
}
