<template>
  <SysDrawer
    :title="drawer.title"
    :width="drawer.width"
    :visible="drawer.visible"
    class="custom-class"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <template #Drawer>
      <a-form>
        <a-form-item
          v-bind="validateInfos.type"
          :labelCol="{ style: 'width:80px;' }"
          label="菜单类型"
        >
          <a-radio-group v-model:value="addModel.type">
            <a-radio :value="'0'">目录</a-radio>
            <a-radio :value="'1'">菜单</a-radio>
            <a-radio :value="'2'">按钮</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-bind="validateInfos.parentName"
          :labelCol="{ style: 'width:80px;' }"
          label="上级菜单"
        >
          <a-input
            readonly
            @click.native="selectParent"
            v-model:value="addModel.parentName"
            placeholder="请选择上级菜单"
          ></a-input>
        </a-form-item>
        <a-form-item
          v-bind="validateInfos.title"
          :labelCol="{ style: 'width:80px;' }"
          label="菜单名称"
        >
          <a-input
            v-model:value="addModel.title"
            placeholder="请填写菜单名称"
          ></a-input>
        </a-form-item>
        <a-form-item
          v-bind="validateInfos.code"
          :labelCol="{ style: 'width:80px;' }"
          label="权限字段"
        >
          <a-input
            v-model:value="addModel.code"
            placeholder="请选择上级菜单"
          ></a-input>
        </a-form-item>

        <a-form-item :labelCol="{ style: 'width:80px;' }" label="序号">
          <a-input
            v-model:value="addModel.orderNum"
            placeholder="请填写菜单名称"
          ></a-input>
        </a-form-item>
        <a-form-item
          v-show="addModel.type != '2'"
          v-bind="validateInfos.mname"
          :labelCol="{ style: 'width:80px;' }"
          label="路由名称"
        >
          <a-input
            v-model:value="addModel.name"
            placeholder="请填写路由的name"
          ></a-input>
        </a-form-item>

        <a-form-item
          v-bind="validateInfos.path"
          :labelCol="{ style: 'width:80px;' }"
          label="路由地址"
        >
          <a-input
            v-model:value="addModel.path"
            placeholder="请填写路由的path"
          ></a-input>
        </a-form-item>

        <a-form-item
          v-show="addModel.type == '1'"
          v-bind="validateInfos.url"
          :labelCol="{ style: 'width:80px;' }"
          label="组件地址"
        >
          <a-input
            v-model:value="addModel.url"
            placeholder="请填写组件url"
          ></a-input>
        </a-form-item>

        <a-form-item :labelCol="{ style: 'width:80px;' }" label="菜单图标">
          <a-input
            v-model:value="addModel.icon"
            placeholder="请填写菜单图标"
          ></a-input>
        </a-form-item>
      </a-form>
    </template>
  </SysDrawer>
  <!-- 上级菜单弹框 -->
  <MenuParent ref="parentRef" @selectId="selectId"></MenuParent>
</template>

<script setup lang="ts">
import useDrawer from "@/hooks/useDrawer";
import SysDrawer from "@/components/SysDrawer.vue";
import { EditType, Title } from "@/type/BaseEnum";
import MenuCheck from "@/composable/menu/MenuCheck";
import useForm from "ant-design-vue/es/form/useForm";
import { ref, reactive, watch } from "vue";
import MenuParent from "./MenuParent.vue";
import { addMenuApi, editMenuApi } from "@/api/menu/Menu";
import { MenuModel, TreeNode } from "@/api/menu/MenuType";
import { message } from "ant-design-vue";
import useInstance from "@/hooks/useInstance";

// 上级菜单的属性
const parentRef = ref();

const { global } = useInstance()

const { drawer, onClose, onShow } = useDrawer();

const { addModel, rules } = MenuCheck();

const { validate, resetFields, validateInfos, clearValidate } = useForm(
  addModel,
  rules
);

watch(() => addModel.type,() => {
    clearValidate();
    if (addModel.type != "2") {
      if (addModel.type == "1") {
        rules.name[0].required = true;
        rules.path[0].required = true;
        rules.url[0].required = true;
      } else {
        rules.name[0].required = true;
        rules.path[0].required = true;
        rules.url[0].required = false;
      }
    } else {
      rules.name[0].required = false;
      rules.path[0].required = false;
      rules.url[0].required = false;
    }
    useForm(addModel, rules);
  }
);

//注册事件
const emit = defineEmits(["refresh"]);
//弹框确定
const confirm = () => {
  //表单验证
  validate().then(async () => {
    let res = null;
    if (addModel.editType === EditType.ADD) {
      res = await addMenuApi(addModel);
      console.log(res.data);
    } else {
      res = await editMenuApi(addModel)
    }
    if (res && res.code == 200) {
      message.success(res.msg);
      //刷新表格
      emit("refresh");
    }
    onClose();
  });
};

const show = (type: string, row: MenuModel) => {
  drawer.width = 510;
  resetFields();
  if (type === EditType.ADD) {
    drawer.title = Title.ADD;
  } else {
    drawer.title = Title.EDIT
    global.$objCoppy(row, addModel)
  }
    addModel.editType = type;
    onShow()
};

defineExpose({
  show,
});

//选择上级菜单点击事件
const selectParent = () => {
    parentRef.value.show()
}
const selectId = (node: TreeNode) => {
    console.log(node)
    addModel.parentId = node.parentId;
    addModel.parentName = node.parentName
}
</script>
