import { def } from "@vue/shared";
import { defineStore } from "pinia";
export const collapseStore = defineStore('isCollapse', {
    // 定义 state
    state:() => {
        return {
            isCollapse: false
        }
    },
    // 定义 getters
    getters: {
        getCollapse: (state) => {
            return state.isCollapse
        }
    },
    // 定义 actions
    actions: {
        setCollapse() {
            this.isCollapse = !this.isCollapse
        }
    }
})

export const fullStore = defineStore('isFull', {
    state:() => {
        return {
            isFull: false
        }
    },
    getters: {
        getFull: (state) => {
            return state.isFull
        }
    },
    actions: {
        setFull() {
            this.isFull = !this.isFull
        }
    }
})