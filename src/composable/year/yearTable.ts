import { ListParm } from "@/api/year/YearType"
import { getYearListApi } from "@/api/year/Year"
import { nextTick, onMounted, reactive, ref } from "vue"

export default function yearTable() {
    
    const tableHeight = ref(0)

    const listParm = reactive<ListParm>({
        currentPage: 1,
        pageSize: 10,
        videoYear: ''
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
            title: '年份',
            key: 'videoYear',
            dataIndex: 'videoYear',
            align: 'center'

        },
        {
            title: '操作',
            key: 'action',
            align: 'center'
        }
    ]

    const rolePage = reactive({
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
            rolePage.current = current;
            rolePage.pageSize = size;
            getList()
        }
    })

    const getList = async ()=> {
        let res = await getYearListApi(listParm) 
        if (res && res.code == 200) {
            console.log(res)
            tableList.list = res.data.records;
            rolePage.total = res.data.total;
        }
    }

    //搜索
const searchBtn = () => {
    getList()
}
//重置
const resetBtn = () => {
    listParm.currentPage = 1;
    listParm.videoYear = ''
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
        rolePage,
        getList,
        onMounted,
        searchBtn,
        resetBtn
    }
}