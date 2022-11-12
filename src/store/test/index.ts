import { defineStore } from 'pinia'
export const testStore = defineStore('testStore',{
    // 定义 state
    state: () => {
        return {
            count: 10
        }
    },
    // 定义 getters
    getters: {
        // 获取 count
        getCount(state) {
            return state.count;
        }
    },
    // 定义 actions 操作 state
    // 不能使用箭头函数，使用箭头函数会改变this的指向
    actions: {
        setCount() {
            this.count++;
        }
    }
})