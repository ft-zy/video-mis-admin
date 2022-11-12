<template>
  <a-drawer
    :visible="props.visible"
    :width="props.width"
    class="custom-class"
    :title="props.title"
    :placement="props.placement"
    :maskClosable="props.maskClosable"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
      <template #footer>
      <a-button key="back" style="margin-right: 8px; width: 88px;" @click="onClose">取消</a-button>
      <a-button key="submit" type="primary" style="width: 88px"  @click="onConfirm">提交</a-button>
    </template>
    <div :style="{height: props.width + 'px'}" style="overflow-y: auto; overflow-x: inherit;">
            <slot name="Drawer"></slot>
        </div>
  </a-drawer>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
    title?: string;
    visible?: boolean;
    width: number;
    placement?: string;
    maskClosable?: boolean;
}>(), {
    title: '标题',
    visible: false,
    width: 650,
    placement: 'right',
    maskClosable: true
})

//注册事件
const emit = defineEmits(['onClose', 'onConfirm'])

//关闭弹框的事件
const onClose = () => {
    emit('onClose')
}

//弹框确定事件
const onConfirm = () => {
    emit('onConfirm')
}
</script>

<style lang="scss">
.ant-drawer-header {
    height: 50px;
    background: #7072ed !important;
    // box-shadow: 0 4px 8px 0px rgba(246, 241, 241, 0.947), 0 6px 20px 0 rgba(255, 255, 255, 0);
}
.ant-drawer-title {
    color: rgb(255, 255, 255) !important;
}
.ant-drawer-close {
    color:  rgb(255, 255, 255) !important;
}
</style>
