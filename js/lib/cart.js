var vm = new Vue({
    el:"#app",
    data:{
       totalMoney:0,
       productList:[],
       checkAllFlag:false,
       delFlag:false,
       curProduct:""
    },
     filters: {
         formatMoney:function(value){
               return "￥"+value.toFixed(2);
         }
     },
     mounted:function () {
           this.$nextTick(function(){
            vm.cartView();
           })
     },
    methods:{
      cartView:function(){
          let _this = this;
          this.$http.get("data/cartData.json",{"id":123}).then(res=>{
              _this.productList = res.data.result.list;
          });
      },
      changeMoney:function(product,way){
               if(way>0){
                   product.productQuantity++;
               }else{
                product.productQuantity--;
                if(product.productQuantity<1){
                    product.productQuantity = 1;
                }
               }
               this.calcTotalPrice();
      },
      selectedProduct:function(item){
        if(typeof item.checked === 'undefined'){
            this.$set(item,'checked',true);
        }else {
            item.checked = !item.checked;
        }
        this.calcTotalPrice();//单击后执行
    },
    checkAll:function(flag){//flag是区分全选还是取消
          this.checkAllFlag = flag;//先控制全选选中
          var _this = this;
          this.productList.forEach(function(item,index){
            if(typeof item.checked === 'undefined'){
                _this.$set(item,'checked',_this.checkAllFlag);//作用域已经改变所以不能用this
            }else {
                item.checked = _this.checkAllFlag;
            }   
          });
          this.calcTotalPrice();
          
              //代表选中了 选中了要遍历商品列表
             // value.checked = true;如果第一次用户上来直接就点了全选 name我们设置这个true其实是没有用的，我们value里面并没有checked这个属性 只有我们点击了一次之后 才会进行注册，所以需要进行判断
    },
    calcTotalPrice:function(){
        //当你单机选中了以后 我们计算商品的金额
        var _this = this;
        _this.totalMoney = 0//在每次执行前应该金额清零
        this.productList.forEach(function(item,index){
               //先遍历一下商品列表 便利之后判断一下
               if(item.checked){
                   //item.checked如果为true这件商品就被选中了  应该用单价乘以数量
                   _this.totalMoney += item.productPrice*item.productQuantity;

               }
          });
    },
    delConfirm:function(){
       this.delFlag=true ;
         this.curProduct = item;                //我们要保存当前选中的商品
    },
    delProduct:function(){
        var index = this.productList.indexOf(this.curProduct)//通过indexOf来去搜索当前选中的商品
       //获取当前点击的商品之后 用splice删除
       this.productList.splice(index,1)//从当前第一个元素开始删
       this.delFlag=false;
    }//点击删除之后触发
    }
})