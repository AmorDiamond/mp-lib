import { appCenter } from "../core/appCetner";

export const baseURL =  appCenter.apiBaseUrl
//https://jxsmhtest.lzlj.com  http://10.0.48.27:9999  https://jxsmh-gateway.lzlj.com
const app = getApp();

class Ajax {
    get(url, data) {
        wx.showLoading({
            title: "加载中...",
            mask: true
        });
        return new Promise((resolve, reject) => {
            wx.request({
                url: baseURL + url,
                data,
                header:{
                    Authorization:wx.getStorageSync('token'),
                    accountType :wx.getStorageSync('accountType'),
                    agentCode:wx.getStorageSync('agentCode')

                },
                method: "GET",
                success: function(res) {
                    resolve(res);
                },
                fail: function(res) {
                    reject(res);
                },
                complete: function(res) {
                    wx.hideLoading();
                    if(res.data && res.data.code==12004){
                        wx.showToast({
                            title: res.data.msg,
                            duration: 2000,
                            icon: 'none',
                            success:()=>{
                               wx.redirectTo({
                                 url: '/pages/login/login',
                               })
                               wx.removeStorageSync('token')
                               wx.removeStorageSync('brandInfoName')
              
                            }
                          })
                    }
                }
            });
        });
    }

    post(url, data) {
        wx.showLoading({
            title: "加载中...",
            mask: true
        });
        return new Promise((resolve, reject) => {
            wx.request({
                url: baseURL + url,
                data,
                method: "POST",
                header:{
                    Authorization:wx.getStorageSync('token'),
                    accountType :wx.getStorageSync('accountType'),
                    agentCode:wx.getStorageSync('agentCode')

                },
                success: function(res) {
                    resolve(res);
                },
                fail: function(res) {
                    reject(res);
                },
                complete: function(res) {
                    wx.hideLoading();
                    if(res.data && res.data.code==12004){
                        wx.showToast({
                            title: res.data.msg,
                            duration: 2000,
                            icon: 'none',
                            success:()=>{
                               wx.redirectTo({
                                 url: '/pages/login/login',
                               })
                               wx.removeStorageSync('token')
                               wx.removeStorageSync('brandInfoName')
                               agentCode:wx.getStorageSync('agentCode')
              
                            }
                          })
                    }
                }
            });
        });
    }
    put(url, data) {
        wx.showLoading({
            title: "加载中...",
            mask: true
        });
        return new Promise((resolve, reject) => {
            wx.request({
                url: baseURL + url,
                data,
                method: "PUT",
                header:{
                    Authorization:wx.getStorageSync('token'),
                    accountType :wx.getStorageSync('accountType'),
                    agentCode:wx.getStorageSync('agentCode')

                },
                success: function(res) {
                    resolve(res);
                },
                fail: function(res) {
                    reject(res);
                },
                complete: function(res) {
                    wx.hideLoading();
                    if(res.data.code==12004){
                        wx.showToast({
                            title: res.data.msg,
                            duration: 2000,
                            icon: 'none',
                            success:()=>{
                               wx.redirectTo({
                                 url: '/pages/login/login',
                               })
                               wx.removeStorageSync('token')
                               wx.removeStorageSync('brandInfoName')
              
                            }
                          })
                    }
                }
            });
        });
    }
}

const ajax = new Ajax();

export default ajax;





//登录查询经销商名称
export const login = (data) => {
    wx.showLoading({
        title: "加载中...",
        mask: true
    });
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseURL + `/login`,
            header:{
                'accountType' :app.globalData.accountType,
            },
            data,
            method: "post",
            complete: function(res) {
                wx.hideLoading();
                resolve(res);
            },
            success:function (res) {
                const token = res.data.data.token
               wx.setStorageSync('token', token)
            }
        });
    });
};

//登录获取公司名称
export const getBrandInfo = (data) => {
    return ajax.get(`/api/v1/user/dealer/list`,data);
};

//设置公司名称
export const setBrandInfo = (data) => {
    return ajax.post(`/api/v1/user/app/setBrandInfo`,data);
};


//经销商获取公告列表
export const getAgentNoticeList = (data) => {
    return ajax.post(`/api/v1/customer/notice/app/getAppNoticeList`,data);
};

//投诉建议查询列表
export const searchAgent = (data) => {
    return ajax.post(`/api/v1/customer/complaints/app/searchApp`,data);
};
//投诉建议条件搜索
export const searchAgentApp = (data) => {
    return ajax.get(`/api/v1/customer/complaints/app/searchAgentApp`,data);
};
//投诉建议详情
export const detailAgent = (data) => {
    return ajax.get(`/api/v1/customer/complaints/app/search/detailApp`,data);
};

//经销商处理投诉建议
export const handleAgent = (data) => {
    return ajax.post(`/api/v1/customer/complaints/app/handleApp`,data);
};

//经销商确认投诉建议
export const confirmHandle = (data) => {
    return ajax.get(`/api/v1/customer/complaints/app/confirmHandleApp`,data);
};

//新增投诉建议
export const addcomplaints = (data) => {
    return ajax.post(`/api/v1/customer/complaints/app/saveApp`,data);
};

//经销商获取公告详细
export const getAgentNotice = (data) => {
    return ajax.get(`/api/v1/customer/notice/app/getAppNotice`,data);
};

//执行案记录查询
export const performCase = (data) => {
    return ajax.post(`/api/v1/thirdParty/app/reimbursement/perform-case`,data);
};

//执行案确认
export const performOk = (data) => {
    return ajax.put(`/api/v1/thirdParty/app/reimbursement/perform-case/${data}`);
};

//经销商费用总览
export const thirdPartyList = (data) => { //app
    return ajax.post(`/api/v1/thirdParty/app/costs/list`,data);
};


//订单费用使用明细列表
export const reimburseDetail = (data) => {
    return ajax.get(`/api/v1/thirdParty/app/costs/reimburseDetailList`,data);
};


//审核通过的费用报销单列表
export const reimburseList = (data) => {
    return ajax.post(`/api/v1/thirdParty/app/costs/reimburseList`,data);
};

//费用使用明细列表(单个)
export const DreimburseDetail = (data) => {
    return ajax.get(`/api/v1/thirdParty/app/costs/reimburseDetail`,data);
};


//获取销售订单列表
export const orderList = (data) => {
    return ajax.post(`/api/v1/thirdParty/app/orders/list`,data);
};

//获取销售订单详情
export const orderDetail = (data) => {
    return ajax.get(`/api/v1/thirdParty/app/orders/detail`,data);
};

//获取合同详情
export const contractsDetail = (data) => {
    return ajax.get(`/api/v1/thirdParty/app/contracts/detail`,data);
};

//获取合同列表
export const contractsList = (data) => {
    return ajax.post(`/api/v1/thirdParty/app/contracts/list`,data);
};

//获取客户列表
export const customersList = (data) => {
    return ajax.get(`/api/v1/user/app/customers/agent`,data);
};

//获取客关联终端
export const customerskids = (data) => {
    return ajax.get(`/api/v1/user/app/customers/kids`,data);
};


//获取客户数量
export const customercounts = (data) => {
    return ajax.get(`/api/v1/user/app/customers/agent/counts`,data);
};


//获取我的员工下拉角色
export const selectRole = (data) => {
    return ajax.get(`/api/v1/user/app/role/selectRole`,data);
};


//获取我的员工列表
export const AgentUser = (data) => {
    return ajax.post(`/api/v1/user/app/employeeAgentUser`,data);
};

//我的员工新增
export const addAgentUser = (data) => {
    return ajax.post(`/api/v1/user/app/addAgentUser`,data); 
};


//我的员工编辑
export const AgentUserSave = (data) => {
    return ajax.post(`/api/v1/user/app/employeeWineryUserSave`,data); 
};

//获取经销商门户信息
export const getinformation = (data) => {
    return ajax.get(`/api/v1/user/app/agent/information`,data); 
};

//我的二维码
export const qrcode = (data) => {
    return ajax.get(`/api/v1/user/app/qrcode`,data); 
};

//我的二维码经销商名称
export const qrname = (data) => {
    return ajax.get(`/api/v1/user/app/qrcode/name`,data); 
};

//我的信息
export const appmsg = (data) => {
    return ajax.get(`/api/v1/user/app/msg`,data); 
};

//根据经销商编码 获取 管理区域
export const register = (data) => {
    return ajax.get(`/api/v1/user/register`,data); 
};

//获取品牌下拉框 /api/v1/user/organization/getBrandInfoMap
export const regBrandInfo = (data) => { ///api/v1/user/register/brand
    return ajax.get(`/api/v1/user/organization/getBrandInfoMap`,data); 
};

//信用代码 获取其余信息
export const qualify = (data) => {
    return ajax.get(`/api/v1/user/register/qualify`,data); 
};

//获取关联业务人员
export const business = (data) => {
    return ajax.get(`/api/v1/user/register/business`,data); 
};

//获取短信验证
export const getsms = (data) => {
    return ajax.get(`/api/v1/user/app/sms`,data); 
};


//修改密码确定按钮
export const updateAccount = (data) => {
    return ajax.post(`/api/v1/user/app/updateAccount`,data); 
};

//修改密码确定按钮 未登录
export const updateForgetAccount = (data) => {
    return ajax.post(`/api/v1/user/app/updateForgetAccount`,data); 
};


//获取用户id
export const userMessage = (data) => {
    return ajax.post(`/api/v1/user/app/userMessage`,data); 
};



//获取省份
export const province = (data) => {
    return ajax.get(`/api/v1/user/administrative-area/province`,data); 
};

//获取城市
export const city = (data) => {
    return ajax.get(`/api/v1/user/administrative-area/city`,data); 
};

//获取区域
export const distrcit = (data) => {
    return ajax.get(`/api/v1/user/administrative-area/distrcit`,data); 
};

//获取物料
export const matCode = (data) => {
    return ajax.get(`/api/v1/stock/material-info/mat-code`,data); 
};

//注册
export const registerst = (data) => {
    return ajax.post(`/api/v1/user/register`,data); 
};

//注册验证手机
export const loginPhone = (data) => {
    return ajax.get(`/api/v1/user/register/user`,data); 
};

//上传图片获取osstoken
export const tstToken = (data) => {
    return ajax.get(`/api/v1/user/aliyunoss/credentials`,data); 
};

//首页合同达成率
export const achieve = (data) => {
    return ajax.post(`/api/v1/thirdParty/app/contracts/achieve`,data); 
};

//资金往来明细
export const moneyDetail = (data) => {
    return ajax.post(`/api/v1/thirdParty/app/money-detail/detail`,data); 
};

//我的保证金/明细
export const depositDetail = (data) => {
    return ajax.post(`/api/v1/thirdParty/app/deposit-detail/detail`,data); 
};


//资金总览
export const moneySummary = (data) => {
    return ajax.post(`/api/v1/thirdParty/app/money-detail/summary`,data); 
};


//获取公司名称
export const getAllbrand = (data) => {
    return ajax.get(`/api/v1/user/brand`,data); 
};

//获取公司名称控制
export const getpermission = (data) => {
    return ajax.get(`/api/v1/user/brand/permission`,data); 
};


//首页我的待办count
export const reimCounts = (data) => {
    return ajax.post(`/api/v1/thirdParty/app/reimbursement/to-do`,data); 
};

//资金明细汇总
export const detailTotal = (data) => {
    return ajax.post(`/api/v1/thirdParty/app/money-detail/detailTotal`,data); 
};

//保证金明细汇总
export const depositTal = (data) => {
    return ajax.post(`/api/v1/thirdParty/app/deposit-detail/detailTotal`,data); 
};

//配额使用明细-分页
export const getQuotaDealerUsePage = (data) => {
    return ajax.post(`/api/v1/quota/dealerXCX/quotaApply/getQuotaDealerUsePage`,data); 
};

//关联的订单明细
export const getDealerOrderDetail = (data) => {
    return ajax.post(`/api/v1/quota/thirdParty/getAssociatedOrderTooAli`,data); 
};

//商库存盘点记录列表
export const queryDHistory = (data) => {
    return ajax.post(`/api/v1/quota/dealerXCX/checkStock/queryDealerCheckStockHistory`,data); 
};

//查询经销商盘所有品牌公司的盘点周期
export const DateByBrandCode = (data) => {
    return ajax.get(`/api/v1/quota/dealerXCX/checkStock/getInventoryDateByBrandCode`,data); 
};

export const getInventoryDateDefault = (data) => {
    return ajax.get(`/api/v1/quota/dealerXCX/checkStock/getInventoryDateDefault`,data); 
};

//查询库存盘点详情列表
export const StockListDetail = (data) => {
    return ajax.get(`/api/v1/quota/dealerXCX/checkStock/queryDealerCheckStockListDetail`,data); 
};

//根据物料名称模糊搜索物料
export const getMaterialByName = (data) => {
    return ajax.post(`/api/v1/quota/dealerXCX/checkStock/getMaterialByName`,data); 
};

//查询当前经销商可盘点的物料列表
export const getAllmatByDealer = (data) => {
    return ajax.post(`/api/v1/quota/dealerXCX/checkStock/getAllmatByDealer`,data); 
};

//审批流程外层
export const nextTask = (data) => {
    return ajax.get(`/api/v1/quota/emp/QuotaApply/nextTaskAgent`,data); 
};

//盘点保存
export const checkStockSave = (data) => {
    return ajax.post(`/api/v1/quota/dealerXCX/checkStock/checkStockSave`,data); 
};

//选择审批人列表
export const checkroleId = (data) => {
    return ajax.post(`/api/v1/quota/emp/checkstoc/workflow/roleId`,data); 
};

//库存盘点详情
export const workflowDetail = (source, data) => {
    // 经销商盘点的数据详情
    let url = '/api/v1/quota/emp/checkstoc/workflow/agent/detail'
    if (source == 'SALESMAN') {
        // 员工盘点的数据详情
        url = '/api/v1/quota/emp/checkstoc/workflow/detail'
    }
    return ajax.get(url, data); 
};

//经销商配额调整记录
export const agentHistory = (data) => {
    return ajax.get(`/api/v1/quota/mgmt/quotaModify/agent/history`,data); 
};