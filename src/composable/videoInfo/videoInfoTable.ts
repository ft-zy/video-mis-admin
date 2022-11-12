import { VideoInfoApi } from "@/api/video/VideoInfo"
import { ListParm } from "@/api/video/VideoType"
import { nextTick, onMounted, reactive, ref } from "vue"

export default function videoInfoTable() {

    const tableHeight = ref(0)

    const listParm = reactive<ListParm>({
        currentPage: 1,
        pageSize: 10,
        vname: '',
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
            title: '视频封面',
            key: 'vphoto',
            dataIndex: 'vphoto',
            scopedSlots: {
                customRender: "vphoto"
              },
            width:180,
            align: 'center'
        },
        // { title: '图片',width: 120,dataIndex: 'vphoto',fixed: 'left', key: 'vphoto',scopedSlots: { customRender: 'vphoto' }},
        {
            title: '视频名称',
            key: 'vname',
            dataIndex: 'vname',
            width:150,
            align: 'center'
        },
        {
            title: '视频介绍',
            key: 'vinfo',
            dataIndex: 'vinfo',
            width:150,
            align: 'center'
        },
        {
            title: '视频类型',
            key: 'id',
            dataIndex: 'id',
            width:120,
            align: 'center'
        },
        {
            title: '视频地区',
            width:120,
            key: 'rid',
            dataIndex: 'rid',
            align: 'center'
        },
        {
            title: '视频年份',
            width:120,
            key: 'yid',
            dataIndex: 'yid',
            align: 'center'
        },
        {
            title: '视频预览',
            width:350,
            key: 'vurl',
            dataIndex: 'vurl',
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
        let res = await VideoInfoApi(listParm)
        if (res && res.code == 200 ) {
            console.log("-----------");
            console.log(res.data.vid)
            console.log("-----------");
            //设置表格数据
            tableList.list = res.data;
            //设置分页的总条数
            rolePage.total = res.data.total;
        }
    }

    // const getList = async () => {
    //     let res = await getVideoInfoApi(listParm);
    //     if (res && res.code) {
    //        tableList.list = res.data.records;
    //        rolePage.total = res.data.total;
    //        console.log(res.data.total);
    //     }
    // }

    const searchBtn = () => {
        getList()
    }

    const resetBtn = () => {
        listParm.currentPage = 1;
        listParm.vname = '';
        // listParm.region = '';
        // listParm.typeName = '';
        // listParm.videoYear = '';
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