
import { nextTick, onMounted, reactive, ref } from "vue"
import { TvNameParm} from "@/api/tv_name/TvNameType";
import {getTvNameListApi} from "@/api/tv_name/TvName";


export default function TvNameTable() {

    const tableHeight = ref(0)

    const listParm = reactive<TvNameParm>({
        currentPage: 1,
        pageSize: 10,
        name: ''
    })

    const tableList = reactive({
        list: []
    })

    const columns = [
        {
            title: '序号',
            key: 'num',
            align: 'center',
            fixed: 'left',
            width:100,
            slots:{ customRender: 'num' }
        },
        {
            title: '电视剧封面',
            key: 'cover',
            dataIndex: 'cover',
            width:150,
            align: 'center'
        },
        {
            title: '电视剧名',
            key: 'name',
            dataIndex: 'name',
            width:130,
            align: 'center'
        },
        {
            title: '视频介绍',
            key: 'info',
            dataIndex: 'info',
            width:150,
            align: 'center'
        },
        {
            title: '视频类型',
            key: 'typeName',
            dataIndex: 'typeName',
            width:120,
            align: 'center'
        },
        {
            title: '视频地区',
            width:120,
            key: 'region',
            dataIndex: 'region',
            align: 'center'
        },
        {
            title: '视频年份',
            width:120,
            key: 'videoYear',
            dataIndex: 'videoYear',
            align: 'center'
        },
        {
            title: '操作',
            width:215,
            key: 'action',
            align: 'center',
            fixed: 'right',
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

    const getList = async () => {
        let res = await getTvNameListApi(listParm)
        if (res && res.code == 200 ) {
            //设置表格数据
            tableList.list = res.data;
            //设置分页的总条数
            rolePage.total = res.data.total;
        }
    }

    const searchBtn = () => {
        getList()
    }

    const resetBtn = () => {
        listParm.currentPage = 1;
        listParm.name = '';
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