import {onMounted, ref} from "vue";
import {SelectProps} from "ant-design-vue";
import {TvSelectApi} from "@/api/tv/TvApi";

export default function useTvSelect() {

    // 分类列表数据
    const TvOptions = ref<SelectProps['options']>([]);

    // 获取分类例表
    const getTV = async() => {
        let res = await TvSelectApi()
        if (res && res.code == 200) {
            TvOptions.value = res.data
        }
    }

    const filterTvOption = (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    onMounted(() => {
        getTV()
    })

    return {
        TvOptions,
        filterTvOption
    }
}