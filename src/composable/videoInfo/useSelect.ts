import type { SelectProps } from "ant-design-vue";
import { onMounted, ref } from 'vue';
import { TypeSelectApi, RegionSelectApi, YearSelectApi } from "@/api/video/VideoInfo";
export default function useSelect() {

    // 分类列表数据
    const TypeOptions = ref<SelectProps['options']>([]);
    // 地区列表数据
    const RegionOptions = ref<SelectProps['options']>([]);
    // 年份列表数据
    const YearOptions = ref<SelectProps['options']>([]);

    // 获取分类例表
    const getType = async() => {
        let res = await TypeSelectApi()
        if (res && res.code == 200) {
            TypeOptions.value = res.data
        }
    }

    // 获取地区列表
    const getRegion = async() => {
        let res = await RegionSelectApi()
        if (res && res.code == 200) {
            RegionOptions.value = res.data
        }
    }

    // 获取年份列表
    const getYear = async() => {
        let res = await YearSelectApi()
        if (res && res.code == 200) {
            YearOptions.value = res.data
        }
    }
    
    const filterTypeOption = (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const filterRegionOption = (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const filterYearOption = (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    onMounted(() => {
        getType()
        getRegion()
        getYear()
    })
    
    return {
        TypeOptions,
        RegionOptions,
        YearOptions,
        filterTypeOption,
        filterRegionOption,
        filterYearOption
    }
}