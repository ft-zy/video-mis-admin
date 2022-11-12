import { getRoleListApi } from "@/api/admin/Admin";
import { SelectProps } from "ant-design-vue";
import { onMounted, ref } from "vue";

export default function RoleSelect() {

    const RoleOptions = ref<SelectProps['options']>([]);
    // 获取角色数据
    const getRoleList = async () => {
        let res = await getRoleListApi()
        if (res && res.code == 200) {
            RoleOptions.value = res.data
            console.log(res.data);
        }
    }

    const filterRoleOption = (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    onMounted(() => {
        getRoleList()
    })

    return {
        RoleOptions,
        filterRoleOption
    }
}