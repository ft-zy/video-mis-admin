
import { nextTick, onMounted, reactive, ref } from "vue"
import {TvInfoParm} from "@/api/tv/TvInfoType";
import {getTvListApi} from "@/api/tv/TvApi";

export default function TvInfoTable() {

    const tableHeight = ref(0)

    const listParm = reactive<TvInfoParm>({
        currentPage: 1,
        pageSize: 10,
        count: ''
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
            title: '电视剧',
            key: 'name',
            dataIndex: 'name',
            width:130,
            align: 'center'
        },
        {
            title: '集数',
            key: 'count',
            dataIndex: 'count',
            width:130,
            align: 'center'
        },
        {
            title: '视频',
            key: 'vurl',
            dataIndex: 'vurl',
            width:150,
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

    const TVPage = reactive({
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
            TVPage.current = current;
            TVPage.pageSize = size;
            getList()
        }
    })

    const getList = async () => {
        let res = await getTvListApi(listParm)
        if (res && res.code == 200 ) {
            //设置表格数据
            tableList.list = res.data;
            //设置分页的总条数
            TVPage.total = res.data.total;
        }
    }

    const searchBtn = () => {
        getList()
    }

    const resetBtn = () => {
        listParm.currentPage = 1;
        listParm.count = '';
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
        TVPage,
        getList,
        tableHeight,
        searchBtn,
        resetBtn
    }
}