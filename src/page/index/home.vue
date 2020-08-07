<template>
  <div class="home">
    <div class="list">
      <div class="item">
        <div>￥989889</div>
        <div>平台总销售额</div>
      </div>
      <div class="item">
        <div>￥989889</div>
        <div>平台总销量</div>
      </div>
      <div class="item">
        <div>￥989889</div>
        <div>平台总库存</div>
      </div>
      <div class="item">
        <div>￥989889</div>
        <div>平台总利润</div>
      </div>
    </div>
    <!-- <div ref="chart" style="width:100%;height:376px"></div> -->
  </div>
</template>
<script>
import JsBarcode from "jsbarcode";
// import { delete } from 'vue/types/umd';
export default {
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  created() {
    this.getUser();
  },
  mounted() {
  },
  methods: {
    // 测试开始
    getUser() {
      //获取注册用户
      // this.$http.get(`api/user?mobile=${this.mobile}`).then(res=>{
      //     if(res.data.status == 1){
      //         this.tableData = res.data.list || []
      //     }else{
      //         this.$message({
      //             showClose: true,
      //             message: res.data.message,
      //             type: 'error'
      //         });
      //     }
      // })
    },
    handelChange(value){
      console.log('这是什么？',value)
    }
  },
};
</script>
<style lang="less" scoped>
.item {
  display: flex;
  align-items: center;
  padding: 0 30px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  .left {
    flex: 1;
  }
  .right {
    span {
      display: inline-block;
      width: 30px;
      text-align: center;
      background: red;
      cursor: pointer;
    }
  }
}
.home {
  height: 100%;
  background: #fff;
}
.list {
  display: flex;
  justify-content: space-around;
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    padding: 20px 0;
    // line-height: 50px;
    div:first-child {
      font-size: 28px;
      color: #fff;
    }
    div:last-child {
      color: #fff;
    }
  }
  .item:nth-child(1) {
    background: #4163ff;
  }
  .item:nth-child(2) {
    background: #5393ff;
  }
  .item:nth-child(3) {
    background: #6fbd27;
  }
  .item:nth-child(4) {
    background: #ef7e02;
  }
}
</style>