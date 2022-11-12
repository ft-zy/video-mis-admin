import { Modal } from "ant-design-vue";
export default function myconfirm(attr: string, message: string){
    return new Promise((resolve, reject)=>{
        Modal.confirm({
            title: '系统提示',
            okText: '确定',
            content: '确定要删除此数据嘛',
            okType: 'danger',
            cancelText: '取消',
            onOk: ()=> {
                resolve(true)
            },
            onCancel() {
                reject(false)
            }
        })
    })
}