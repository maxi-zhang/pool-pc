import React from "react";

const HOST = {
    'USER_HOST': 'https://devpuser1.arsyun.com/',
};

// store 存储的键名
const ACTION = {
    // 用户模块的键名
    'CURRENT_PATH':'current_path',//当前的路径
    'CURRENT_OPERATION':'current_operation',//当前操作的模块
    'CURRENT_STEP':'current_step',//当前操作步骤ID
    'LOGIN_STATUS':'login_status',//当前的登录状态
    'ADMIN_USER_ID':'admin_user_id',
    'ADMIN_TOKEN':'admin_token',
    'ERROR_CODE':'error_code',
    'ERROR_DESCRIPTION':'error_description',
    'CLIENT_IP':'client_ip',
    'UUID': 'uuid',//产生图片验证码所用uuid
    'INDEX_MENU':'index_menu',//首页的目录位置
    'SECONDARY_MENU':'secondary_menu',//次级目录
    'POOL_DATA':'pool_data',

    // 'CHECK_PIC_QRCODE': 'check_pic_qrcode',
    'MOBILE_NUMBER':'mobile_number',
    'PICTURE_QRCODE':'picture_qrcode',
    'SMS_CODE':'sms_code',
    'SET_PASSWORD':'set_password',
    'RESET_PASSWORD':'reset_password',

    'SMS_LEFT_TIME':'sms_left_time',//短信验证码倒计时时间
    'SMS_START_COUNT':'sms_start_count',//短信验证码及时已经开始状态防止重复开启
    'JUMP_COUNT':'jump_count',//跳转倒计时

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
    // redux 结构大模块键名
    'REGISTER_MODEL':'register_model',
    'LOGIN_MODEL':'login_model',
    'FIND_PASSWORD_MODEL':'find_password_model',
    'POOL_MODEL':'pool_model',

    // 用户模块，页面定义宏（确定位置）
    'SET_PASSWORD':'set_password',

    // 用户模块 相关当前操作（点击后操作定义，确定操作）
    'REGISTER_NOW':'register_now',//立即注册
    'CHECK_QRCODE':'check_qrcode',//检查图片验证码
    'CHECK_SMS_CODE':'check_sms_code',//检查短信验证码
    'SUCCESS_REGISTER':'success_register',//成功注册
    'LOGIN_OPERATION':'login_operation',//登录操作
    'LOGIN_SUCCESS':'login_success',//登录成功

    // 'SMS_LEFT_TIME':'sms_left_time',

    // 矿场模块操作
    //1:模块名常量 current_operation（确定位置）
    'CREATE_POOL':'create_pool',//创建矿场
    'POOL_OPERATION':'pool_operation',//矿场运维
    'POOL_PROFIT':'pool_profit',//矿场收益
    'ADD_POOL_GROUP':'add_pool_group',//添加分组
    'DEL_POOL_GROUP':'del_pool_group',//删除分组
    'POWER_POOL':'power_pool',//矿池算力
    'POWER_MACHINE':'power_machine',//矿机算力
    'SCREENING_CONDITIONS':'screening_conditions',//筛选条件
    'ADVANCE_SEARCH':'advance_search',//高级搜索
    //矿场模块操作常量
    'UPDATE_POOL_DATA':'update_pool_data',//更新矿场信息


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


export {HOST,ACTION,OPERATION,PATH}