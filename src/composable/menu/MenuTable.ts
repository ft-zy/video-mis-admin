import { getMenuListApi } from "@/api/menu/Menu";
import { MenuParm } from "@/api/menu/MenuType";
import { nextTick, onMounted, reactive, ref } from "vue";
import { h } from "vue";
import { PlusSquareTwoTone, MinusSquareTwoTone } from '@ant-design/icons-vue';
import {ListParm} from "@/api/region/RegionType";

export default function MenuTable() {

    const tableList = reactive({
        list:[],
    })


    const tableHeight = ref(0);

    const columns = [
        {
            title: '序号',
            key: 'num',
            dataIndex: 'num',
            align: 'center',
            fixed: 'left',
            width: 150,
            slots: { customRender: 'num' }
        },
        {
          title: '菜单名称',
          dataIndex: 'title',
          key: 'title',
          align: 'center',
          width: 150
        },
        {
          title: '权限字段',
          dataIndex: 'code',
          key: 'code',
          align: 'center',
          width: 150
        },
        {
          title: '图标',
          dataIndex: 'icon',
          key: 'icon',
          align: 'center',
          width: 120
        },
        {
          title: '上级菜单',
          dataIndex: 'parentName',
          key: 'parentName',
          align: 'center',
          width: 150
        },
        {
          title: '菜单类型',
          dataIndex: 'type',
          key: 'type',
          align: 'center',
          width: 120
        },
        {
          title: '路由名称',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          width: 150
        },
        {
          title: '路由地址',
          dataIndex: 'path',
          key: 'path',
          align: 'center',
          width: 150   
        },
        {
          title: '组件路径',
          dataIndex: 'url',
          key: 'url',
   
          width: 280
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          align: "center",
          width: 230,
          fixed: 'right',
        },
      ];


    const listParm = reactive<MenuParm>({
        pageSize: 10,
        currentPage: 1,
        title: ''
    })

    const MenuPage = reactive({
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
            MenuPage.current = current;
            MenuPage.pageSize = size;
            getList()
        }
    })

    const getList =async () => {
        let res = await getMenuListApi(listParm)
        if (res && res.code == 200) {
            tableList.list = res.data;
            //设置分页的总条数
            MenuPage.total = res.data.total;
        }
    }

    // 自定义展开图标
    const expandIcon = (parm: any)=> {
      // console.log("自定义图标");
      // console.log(parm);
      const { expanded, onExpand, record } = parm
      if (record && record.children.length > 0) {
        if (expanded) {
          return h(MinusSquareTwoTone, {
            class:'iconClass',
            onclick:(event: Event)=> {
              onExpand(record, event)
            }
          })
        } else {
          return h( PlusSquareTwoTone , {
            class:'iconClass',
            onclick:(event: Event)=> {
              onExpand(record, event)
            }
          })
        }
      }
    }

    const searchBtn = () => {
        getList()
    }

    const resetBtn = () => {
        listParm.currentPage = 1;
        listParm.title = ''
        getList()
    }

    const refresh = ()=> {
      getList()
    }

    onMounted(() => {
        getList()
        nextTick(()=> {
            tableHeight.value = window.innerHeight - 300
        })
    })

   return {
        tableList,
        tableHeight,
        listParm,
        MenuPage,
        columns,
        expandIcon,
        searchBtn,
        resetBtn,
        refresh
   }
}