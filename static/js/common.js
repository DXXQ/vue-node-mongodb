     const SIZE_URL = "http://127.0.0.1:";
     const port = 3005;
     const API_LIST = {
     goodsFind : SIZE_URL + port + "/goodsFind",
     checkLogin: SIZE_URL + port + "/checkLogin",
     login : SIZE_URL + port + "/login",
     register :  SIZE_URL + port + "/register",
     goodslist : SIZE_URL + port + "/goodslist", 
     addCart : SIZE_URL + port + "/addCart",
    getGoodsMessage : SIZE_URL + port + "/getGoodsMessage",
    addressCreat : SIZE_URL + port + "/addressCreat",
    removeItem : SIZE_URL + port + "/removeItem",
    editCheckAll: SIZE_URL + port + "/editCheckAll",
    cartEdit: SIZE_URL + port + "/cartEdit"
}

export default API_LIST;