var vm = new Vue({
    el:".container",
    data:{
        limitNum:3,
        addressList:[],
        currentIndex:0,
        shippingMethod:1
    },
    mounted:function(){
        this.$nextTick(function(){
                this.getAddressList();
        });
    },
    computed: {
        filtAddress:function(){
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods: {
        getAddressList:function(){
            var _this = this;
            this.$http.get('data/address.json').then(function(response){
                    var res = response.data;
                 if(res.status == "0"){
                     _this.addressList = res.result;//给这个数组保存起来
                 }
            })
        },
        loaderMore:function(){
            this.limitNum = this.addressList.length;
        },
        setDefault:function(addressId){
            this.addressList.forEach(function(address,index){
                      if(address.addressId==addressId){
                             address.isDefault = true;//判断这个address.addressId==当前的addressId说明我们需要把当前的对象进行修改
                      }else{
                        address.isDefault = false;
                      }//这样相当于把我们当前选中的卡片改为true之后其他的卡片就为false
            });
        }
    }
})