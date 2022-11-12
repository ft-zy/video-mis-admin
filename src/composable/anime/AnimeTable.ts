
import { nextTick, onMounted, reactive, ref } from "vue"
import {ListParm} from "@/api/anime/AnimeType";
import {animePageApi} from "@/api/anime/Anime";

export default function AnimeNameTable() {

    const tableHeight = ref(0)

    const listParm = reactive<ListParm>({
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
            title: '动漫',
            key: 'aid',
            dataIndex: 'aid',
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

    const AnimePage = reactive({
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
            AnimePage.current = current;
            AnimePage.pageSize = size;
            getList()
        }
    })

    const getList = async () => {
        let res = await animePageApi(listParm)
        if (res && res.code == 200 ) {
            //设置表格数据
            tableList.list = res.data;
            //设置分页的总条数
            AnimePage.total = res.data.total;
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
        AnimePage,
        getList,
        tableHeight,
        searchBtn,
        resetBtn
    }
}