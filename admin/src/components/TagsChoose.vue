<template>
    <div class="tag-container">
        <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            effect="plain"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{ tag }}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"></el-input>
        <el-button class="button-new-tag" v-else size="small" @click="showInput" >+ New Tag</el-button>
    </div>
</template>



<script>
export default {
    props: {
        cb: {
            type: Function,
            default: () => {}
        },
        tags: {
            type: Array,
            default:() => ['知识']
        }
    },
    data() {
        return {
            inputVisible: false,
            inputValue: "",
        };
    },
    computed: {
        dynamicTags: {
            get() {
                return this.tags;
            },
            set() {
                return this.tags
            }
        },
    },
    methods: {
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick((_) => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = "";
            this.cb(this.dynamicTags)
        },
    },
    mounted() {
        this.cb(this.dynamicTags)
    },
};
</script>

<style>
.tag-container {
    display: flex;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px!important;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>