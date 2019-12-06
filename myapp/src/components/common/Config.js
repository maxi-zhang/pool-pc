import React from "react";

const HOST = {
    'USER_HOST': 'http://devpuser1.arsyun.com/',
};

// store 存储的键名
const ACTION = {
    // 用户模块的键名
    'CURRENT_PATH':'current_path',//当前的路径
    'CURRENT_OPERATION':'current_operation',//当前操作的模块
    'CURRENT_OPEN':'current_open',//当前打开的弹窗
    'POOL_INDEX':'pool_index',//矿场当前主页

    'LOGIN_STATUS':'login_status',//当前的登录状态
    'ADMIN_USER_ID':'admin_user_id',
    'ADMIN_TOKEN':'admin_token',
    'TENANT_ID':'tenant_id',
    'CAN_CHANGE_TENANT':'can_change_tenant',
    'CAN_CHANGE_TYPE':'can_change_type',
    'ADMIN_USER_NAME':'admin_user_name',
    'ADMIN_USER_ICON':'admin_user_icon',
    'ADMIN_ACCOUNT':'admin_account',
    'ADMIN_TYPE':'admin_type',
    'TENANT_PERMISSION':'tenant_permission',

    'ERROR_CODE':'error_code',
    'ERROR_DESCRIPTION':'error_description',
    'CLIENT_IP':'client_ip',
    'UUID': 'uuid',//产生图片验证码所用uuid
    'INDEX_MENU':'index_menu',//首页的目录位置
    'SECONDARY_MENU':'secondary_menu',//次级目录

    // 'CHECK_PIC_QRCODE': 'check_pic_qrcode',
    'MOBILE_NUMBER':'mobile_number',
    'PICTURE_QRCODE':'picture_qrcode',
    'SMS_CODE':'sms_code',
    'SET_PASSWORD':'set_password',
    'RESET_PASSWORD':'reset_password',
    'SMS_LEFT_TIME':'sms_left_time',//短信验证码倒计时时间
    'SMS_START_COUNT':'sms_start_count',//短信验证码及时已经开始状态防止重复开启
    'JUMP_COUNT':'jump_count',//跳转倒计时

    'POOL_DATA':'pool_data',
    'POOL_COIN':'pool_coin',
    'POOL_SET':'pool_set',

    'CAN_ADD_MINER':'can_add_miner',
    'CHOOSE_CAN_ADD':'choose_can_add',
    'CAN_DEL_MINER':'can_del_miner',
    'CHOOSE_CAN_DEL':'choose_can_del',

    'POOL_NAME':'pool_name',
    'POOL_NOTICE':'pool_notice',
    //告警相关设置
    'WARNING_DROP':'warning_drop',
    'WARNING_BAD_LINE':'warning_bad_line',
    'WARNING_TEMP_CPU':'warning_temp_cpu',
    'WARNING_TEMP_DISK':'warning_temp_disk',
    'WARNING_NO_ROOM':'warning_no_room',
    'WARNING_RATE':'warning_rate',

    'AP_NAME':'ap_name',
    'AP_ID':'ap_id',
    'AP_TYPE':'ap_type',
    'POOL_ID':'pool_id',
    'RENT_PRICE':'rent_price',
    'IF_IS_RENT':'if_is_rent',
    'IF_IS_DEFAULT':'if_is_default',
    'CURRENT_COIN':'current_coin',
    'ADD_GROUP':'add_group',
    'DEL_GROUP':'del_group',
    'CHOOSE_DEL_GROUP':'choose_del_group',

    'IF_CLEAR':'if_clear',
    'UNGROUP_INFO':'ungroup_info',

    // 矿场模块的键名
    'CURRENT_POOL':'current_pool',//当前矿场的矿场ID
    'SELECT_MACHINE':'select_machine',//选择的矿机列表[]
    'OPERATION_MACHINE':'operation_machine',//当前操作的矿机ID
    //2：筛选条件
    'START_TIME':'start_time', //搜索开始时间
    'END_TIME':'end_time',//搜索结束时间
    'SEARCH_KEYWORD':'search_keyword',//搜索关键词
    'ORDER_CHOOSE':'order_choose',//根据什么排序
    'ASC_OR_DESC':'asc_or_desc',//正序OR倒叙
}

// 操作常量的命名
const OPERATION = {
    'USER_INFO':'user_info',
    'SYSTEM_INFO':'system_info',
    'ERROR_INFO':'error_info',
    'MENU_INFO':'menu_info',
    'PATH_INFO':'path_info',
    'POOL_INFO':'pool_info',
    // redux 结构大模块键名
    'REGISTER_MODEL':'register_model',
    'LOGIN_MODEL':'login_model',
    'FIND_PASSWORD_MODEL':'find_password_model',
    // 用户模块，页面定义宏（确定位置）
    'SET_PASSWORD':'set_password',
    // 用户模块 相关当前操作（点击后操作定义，确定操作）
    'REGISTER_NOW':'register_now',//立即注册
    'CHECK_QRCODE':'check_qrcode',//检查图片验证码
    'CHECK_SMS_CODE':'check_sms_code',//检查短信验证码
    'SUCCESS_REGISTER':'success_register',//成功注册
    'LOGIN_OPERATION':'login_operation',//登录操作
    'LOGIN_SUCCESS':'login_success',//登录成功
    'CHANGE_ADMIN_MODE':'change_admin_mode',//修改当前用户模式
    // 'SMS_LEFT_TIME':'sms_left_time',
    // 矿场模块操作
    //1:模块名常量 current_operation（确定位置）
    'CREATE_POOL':'create_pool',
    'CREATE_POOL_ONE':'create_pool_one',//创建矿场
    'CREATE_POOL_TWO':'create_pool_two',//创建矿场
    'POOL_SET':'pool_set',//矿场设置弹框
    'ADD_MINER':'add_miner',//添加矿机
    'DELETE_MINER':'delete_miner',//移除矿机
    'POOL_MAIN':'pool_main',//矿机主要
    'BIND_MINER':'bind_miner',//移除矿机

    'POOL_OPERATION':'pool_operation',//矿场运维
    'POOL_RENT':'pool_rent',//矿场租赁
    'POOL_PROFIT':'pool_profit',//矿场收益
    'ADD_POOL_GROUP':'add_pool_group',//添加分组
    'DEL_POOL_GROUP':'del_pool_group',//删除分组
    'POWER_POOL':'power_pool',//矿池算力
    'POWER_MACHINE':'power_machine',//矿机算力
    'SCREENING_CONDITIONS':'screening_conditions',//筛选条件
    'ADVANCE_SEARCH_ONE':'advance_search',//高级搜索1
    'ADVANCE_SEARCH_TWO':'advance_search',//高级搜索2
    'BILL_APPLY':'bill_apply',//订单申请
    'ADD_GROUP':'add_group',//添加分组
    'DEL_GROUP':'del_group',//删除分组

    //矿场模块操作常量
    'UPDATE_POOL_DATA':'update_pool_data',//更新矿场信息
    'UPDATE_POOL_COIN':'update_pool_coin',//更新矿池信息
    'SINGLE_POOL_DATA':'single_pool_data',//获取矿场信息


    // 通用操作常量配置（确定操作）
    'NETWORK_CHECK':'network_check', //网络状态检查
    'CLEAR_REDUX':'clear_redux',     //清空redux数据
    'UPDATE_TOKEN':'update_token',  //登录成功后更新token

    // 各种目录的配置
    'INDEX_MENU_1':'index',
    'INDEX_MENU_2':'service',
    'INDEX_MENU_3':'pool',
    'INDEX_MENU_4':'user',

    // 次级目录second
    // 我的中的次级目录
    'SECOND_MENU_1':'wallet_set', //钱包设置
    'SECOND_MENU_2':'about_us',   //关于我们
    // 服务台中的次级目录
    'SECOND_MENU_3':'staff_operation',  //员工管理
    'SECOND_MENU_4':'my_device',   //我的设备
    'SECOND_MENU_5':'my_entrust',  //我的委托
    'SECOND_MENU_6':'entrust_to_me',  //委托给我
    'SECOND_MENU_7':'virtual_node',//虚拟节点
    'SECOND_MENU_8':'node_income',//节点收益
    'SECOND_MENU_9':'warning_report', //监控报警
    'SECOND_MENU_10':'work_order', //工单
    //创建矿场中的次级目录
    'SECOND_MENU_11':'create_pool',//创建矿场

    // 以下是各种常量配置
    'CLIENT_NAME':'pc_explorer_client',
    'CLIENT_CODE':'pc_explorer_code',
    'CLIENT_VERSION':'1.0.0',
    'DEVICE_TYPE':'windows-pc',
}
// 路由模块配置
const PATH = {
    'HOME_INDEX':'/#/', //系统首页
    'SERVER_PAGE':'/serverPage',//服务台
    'POOL_PAGE' : '/poolPage',//矿场
    'USER_PAGE' : '/userPage',//用户模块
    'BILL_PAGE':'/billPage',//刷单模块

    'USER_REGISTER':'register',
    'USER_LOGIN':'login',
    'USER_SET':'userSet', //用户设置页

    'SERVER_INDEX':'/serverPage/index', //服务台首页

}



const COIN = {
    'YTA':'YTA',
    'FIL':'FIL',
    'LAMB':'LAMB',
    'BHD':'BHD'
}
const YTASET = {
    "DISK_SPACE":'disk_space',
    "USER_MORTGAGE":'user_mortgage',
    "MORTGAGE_BALANCE":'mortgage_balance',
    "USER_MANAGE":'user_manage',
    "AlIANCE_POOL_ID":'aliance_pool_id',
    "MINING_ID":'mining_id',
    "MORTGAGE_KEY":'mortgage_key',
    "MANAGE_KEY":'manage_key',
    "ALIANCE_POOL_KEY":'aliance_pool_key',
    "NODE_COUNT":'node_count',
    "PORT_FROM":'port_from',
    "PORT_TO":'port_to',
    "HOST_URI":'host_uri',
    "ALIANCE_POOL_SPACE":'aliance_pool_space',
}

const FILSET = {
    "MINING_ID":"mining_id",
    "GAS_LIMIT":"gas_limit",
    "GAS_PRICE":"gas_price",
    "PRICE":"price",
    "BLOCK":"block",
    "MIN_INCOME":"min_income",
}

const BHDSET = {
    "MINING_ID":"mining_id",
    "GAS_LIMIT":"gas_limit",
    "GAS_PRICE":"gas_price",
    "PRICE":"price",
    "BLOCK":"block",
    "MIN_INCOME":"min_income",
}



export {HOST,ACTION,OPERATION,PATH,COIN,YTASET,FILSET,BHDSET}