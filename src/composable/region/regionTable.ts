import  { getRegionApi } from '@/api/region/Region'
import { ListParm } from '@/api/region/RegionType'
import { onMounted, reactive, ref, nextTick } from 'vue'
export default function regionTable() {
// 定义表格的高度
const tableHeight = ref(0)
//定义获取数据的参数
const listParm = reactive<ListParm>({
    currentPage: 1,
    pageSize: 10,
    region: ''
})
// 表格数据
const tableList = reactive({
    list: []
})
// 表格的列
const columns = [
    {
        title: '序号',
        key: 'num',
        dataIndex: 'num',
        align: 'center',
        slots: { customRender: 'num' }
    },
    {
        title: '地区',
        key: 'region',
        dataIndex: 'region',
        align: 'center'
    },
    {
        title: '操作',
        key: 'action',
        align: 'center',
    }
]
  
//分页对象
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

//获取表格数据
const getList = async () => {
    let res = await getRegionApi(listParm)
    if (res && res.code == 200) {
        console.log(res)
        //设置表格数据
        tableList.list = res.data.records;
        //设置分页的总条数
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
    listParm.region = ''
    getList()
}
onMounted(() => {
    getList()
    nextTick(() => {
        tableHeight.value = window.innerHeight - 300
    })
})
return {
    listParm,
    tableList,
    columns,
    rolePage,
    getList,
    tableHeight,
    searchBtn,
    resetBtn
}
}