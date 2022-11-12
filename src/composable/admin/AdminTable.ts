
import { getAdminListApi } from "@/api/admin/Admin";
import { AdminParm } from "@/api/admin/AdminType";
import { onMounted, reactive, ref } from "vue";

export default function AdminTable() {
    const tableHeight = ref(0)

    const tableList = reactive({
        list: []
        
    })

    const columns = [
        {
            title: '序号',
            key: 'num',
            dataIndex: 'num',
            align: 'center',
            fixed: 'right',
            slots: { customRender: 'num' }
        },
        {
            title: '头像',
            key: 'aportrait',
            dataIndex: 'aportrait',
            align: 'center',
        },
        {
            title: '姓名',
            key: 'aname',
            dataIndex: 'aname',
            align: 'center'
        },
        {
            title: '角色',
            key: 'roid',
            dataIndex: 'roid',
            align: 'center'
        },
        {
            title: '性别',
            key: 'asex',
            dataIndex: 'asex',
            align: 'center'
        },
        {
            title: '账号',
            key: 'account',
            dataIndex: 'account',
            align: 'center'
        },
        {
            title: '电话',
            key: 'aphone',
            dataIndex: 'aphone',
            align: 'center'
        },
        {
            title: '邮箱',
            key: 'aemail',
            dataIndex: 'aemail',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 220,
            fixed: 'right',
        }
    ]

    const listParm = reactive<AdminParm>({
        pageSize: 10,
        currentPage: 1,
        account: ''
    })

    const AdminPage = reactive({
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
            AdminPage.current = current;
            AdminPage.pageSize = size;
            getList()
        }
    })

    const getList = async () => {
        let res = await getAdminListApi(listParm)
        console.log(res.data);
        
        if (res && res.code == 200) {
            tableList.list = res.data;
            AdminPage.total = res.data.total;
        }
    }

    const searchBtn = () => {
        getList();
    }

    const resetBtn = () => {
        listParm.currentPage = 1;
        listParm.account = ""
        getList()
    }

    // 刷新表格
    const refresh = () => {
        getList()
    }

    onMounted(() => {
        getList();
        tableHeight.value = window.innerHeight - 300
    })

    return {
        tableHeight,
        tableList,
        listParm,
        AdminPage,
        getList,
        columns,
        searchBtn,
        resetBtn,
        refresh
    }

}

