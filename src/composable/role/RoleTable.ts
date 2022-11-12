import { getRoleApi } from "@/api/role/Role";
import { ListParm } from "@/api/role/RoleType";
import { nextTick, onMounted, reactive, ref } from "vue";

export default function roleTable() {
    const tableHeight = ref(0)
    //定义获取数据的参数
    const listParm = reactive<ListParm>({
        currentPage: 1,
        pageSize: 10,
        roleName: ''
    })
    // 表格数据
    const tableList = reactive({
        list: [],
       
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
            title: '权限名称',
            key: 'roleName',
            dataIndex: 'roleName',
            align: 'center'
        },
        {
            title: '权限描述',
            key: 'roleDescribe',
            dataIndex: 'roleDescribe',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 350
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
        let res = await getRoleApi(listParm)
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
        listParm.roleName = ''
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




