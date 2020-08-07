<template>
  <div class="setting">
    <div class="demo-input-suffix">
      <el-input placeholder="请输入内容" v-model="input1" @input="one">
        <i slot="suffix" :class="show?'el-input__icon el-icon-success':''" @click="save"></i>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <el-input placeholder="请输入内容" v-model="input2" @input="two">
        <i slot="suffix" :class="show1?'el-input__icon el-icon-success':''" @click="save"></i>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <el-input placeholder="请输入内容" v-model="input3" @input="three">
        <i slot="suffix" :class="show2?'el-input__icon el-icon-success':''" @click="save"></i>
      </el-input>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input1: null,
      input2:null,
      input3:null,
      show:false,
      show1:false,
      show2:false
    };
  },
  mounted() {
      this.getMain()
  },
  methods: {
    one(){
        if(this.input1!=''){
            this.show = true
        }else{
            this.show = false
        } 
    },
    two(){
        if(this.input1!=''){
            this.show1 = true
        }else{
            this.show1 = false
        } 
    },
    three(){
        if(this.input1!=''){
            this.show2 = true
        }else{
            this.show2 = false
        } 
    },
    getMain(){
        this.$http.get('api/setting').then(res=>{
            if(res.data.status == 1){
                this.input1 = res.data.list[0].version,
                this.input2 = res.data.list[0].androd_url
                this.input3 = res.data.list[0].ios_url
            }else{
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: 'error'
              });
            }
        })
    },
    save(){
        let params = {
            version:this.input1,
            androd_url:this.input2,
            ios_url:this.input3
        }
        this.$http.post('api/setting',params).then(res=>{
            if(res.data.status == 1){
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: 'success'
              });
            }else{
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: 'error'
              });
            }
        })
    }
  },
};
</script>
<style lang="less" scoped>
</style>