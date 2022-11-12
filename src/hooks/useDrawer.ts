import { DrawerModel } from "@/type/BaseType"
import { reactive } from "vue"
export default function useDrawer() {

    const drawer = reactive<DrawerModel>({
        title: '',
        visible: false,
        width: 736,
        placement: 'right',
        maskClosable: true 
    })

    const onConfirm = ()=> {
        drawer.visible = false;
    }

    const onClose = ()=> {
        drawer.visible = false;
    }

    const onShow = ()=> {
        drawer.visible = true
    }

    return {
        drawer,
        onConfirm,
        onClose,
        onShow
    }
}