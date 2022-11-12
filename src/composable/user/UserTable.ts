import {nextTick, onMounted, reactive, ref} from "vue"
import {UserParm} from "@/api/user/UserType";
import {userPageApi} from "@/api/user/User";

export default function userTable() {

    const tableHeight = ref(0)

    const listParm = reactive<UserParm>({
        currentPage: 1,
        pageSize: 10,
        username: ''
    })

    const tableList = reactive({
        list: []
    })

    const columns = [
        {
            title: '序号',
            key : 'num',
            align: 'center',
            fixed: 'left',
            slots: { customRender: 'num' }
        },
        {
            title: '头像',
            key: 'uportrait',
            dataIndex: 'uportrait',
            align: 'center'

        },
        {
            title: '账号',
            key: 'username',
            dataIndex: 'username',
            align: 'center'

        },
        {
            title: '用户名',
            key: 'netName',
            dataIndex: 'netName',
            align: 'center'

        },
        {
            title: '邮箱',
            key: 'email',
            dataIndex: 'email',
            align: 'center'

        },
        {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
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

    const UserPage = reactive({
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
            UserPage.current = current;
            UserPage.pageSize = size;
            getList()
        }
    })

    const getList = async ()=> {
        let res = await userPageApi(listParm)
        if (res && res.code == 200) {
            console.log(res)
            tableList.list = res.data.records;
            UserPage.total = res.data.total;
        }
    }

    //搜索
    const searchBtn = () => {
        getList()
    }
//重置
    const resetBtn = () => {
        listParm.currentPage = 1;
        listParm.username = ''
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
        UserPage,
        getList,
        onMounted,
        searchBtn,
        resetBtn
    }
}