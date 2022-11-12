import {nextTick, onMounted, reactive, ref} from "vue"
import {MsgParm} from "@/api/msg/MsgType";
import {MsgPageApi} from "@/api/msg/Msg";

export default function MsgTable() {

    const tableHeight = ref(0)

    const listParm = reactive<MsgParm>({
        currentPage: 1,
        pageSize: 10,
        title: ''
    })

    const tableList = reactive({
        list: []
    })

    const columns = [
        {
            title: '序号',
            key : 'num',
            align: 'center',
            slots: { customRender: 'num' }
        },
        {
            title: '标题',
            key: 'title',
            dataIndex: 'title',
            align: 'center'

        },
        {
            title: '发布时间',
            key: 'date',
            dataIndex: 'date',
            align: 'center'

        },
        {
            title: '发布内容',
            key: 'info',
            dataIndex: 'info',
            align: 'center'

        },
        {
            title: '操作',
            key: 'action',
            align: 'center'
        }
    ]

    const MsgPage = reactive({
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '50'],
        showTotal: (total: number) => `共有${total}条数据`,
        //页数改变时触发
        onChange: (current: number, size: number) => {
            console.log('页数改变时触发')
            listParm.currentPage = current;
            listParm.pageSize = size;
            MsgPage.current = current;
            MsgPage.pageSize = size;
            getList()
        }
    })

    const getList = async ()=> {
        let res = await MsgPageApi(listParm)
        if (res && res.code == 200) {
            console.log(res)
            tableList.list = res.data.records;
            MsgPage.total = res.data.total;
        }
    }

    //搜索
    const searchBtn = () => {
        getList()
    }
//重置
    const resetBtn = () => {
        listParm.currentPage = 1;
        listParm.title = ''
        getList()
    }

    onMounted(() => {
        getList()
        nextTick(()=> {
            tableHeight.value = window.innerHeight - 300
        })
    })

    return {
        listParm,
        tableList,
        tableHeight,
        columns,
        MsgPage,
        getList,
        onMounted,
        searchBtn,
        resetBtn
    }
}