import type { SelectProps } from "ant-design-vue";
import { onMounted, ref } from 'vue';
import {AnimeSelectApi} from "@/api/anime/Anime";
export default function useAnimeSelect() {

    // 分类列表数据
    const AnimeOptions = ref<SelectProps['options']>([]);

    // 获取分类例表
    const getAnime = async() => {
        let res = await AnimeSelectApi()
        if (res && res.code == 200) {
            AnimeOptions.value = res.data
        }
    }

    const filterAnimeOption = (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    onMounted(() => {
        getAnime()
    })

    return {
        AnimeOptions,
        filterAnimeOption
    }
}