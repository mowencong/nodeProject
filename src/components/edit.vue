<template>
    <div v-if="show&&type=='edit'">
        <el-button type="primary" plain @click="back()">列表</el-button>
        <div style="margin-top:30px">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="用户昵称">
                <el-input v-model="formLabelAlign.name">
                    <i slot="prefix" class="el-icon-edit"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="formLabelAlign.mobile">
                    <i slot="prefix" class="el-icon-edit"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="用户密码">
                <el-input v-model="formLabelAlign.password">
                    <i slot="prefix" class="el-icon-edit"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="支付密码">
                <el-input v-model="formLabelAlign.pay_pass">
                    <i slot="prefix" class="el-icon-edit"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="推广码">
                <el-input v-model="formLabelAlign.share_code">
                    <i slot="prefix" class="el-icon-edit"></i>
                </el-input>
            </el-form-item>
        </el-form>
        <div class="btn">
            <el-button type="warning" plain @click="clear()">重置</el-button>
            <el-button type="primary" plain @click="submit()">提交</el-button>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>

</style>