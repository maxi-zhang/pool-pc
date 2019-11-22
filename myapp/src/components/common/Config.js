
const HOST = {
    'USER_HOST': 'https://devpuser1.arsyun.com/',
};

// store 存储的键名
const ACTION = {
    'CHECK_PIC_QRCODE': 'check_pic_qrcode',
    'MOBILE_NUMBER':'mobile_number',
    'PICTURE_QRCODE':'picture_qrcode',
    'ADMIN_USER_ID':'admin_user_id',
    'ADMIN_TOKEN':'admin_token',
    'SMS_CODE':'sms_code',
    'ERROR_CODE':'error_code',
    'ERROR_DESCRIPTION':'error_description',
    'CURRENT_OPERATION':'current_operation',
    'CURRENT_PATH':'current_path',
    'SMS_LEFT_TIME':'sms_left_time',
    'SMS_START_COUNT':'sms_start_count',
    'SET_PASSWORD':'set_password',
    'RESET_PASSWORD':'reset_password',
    'CLIENT_IP':'client_ip',
    'JUMP_COUNT':'jump_count',
    'LOGIN_STATUS':'login_status',
    'UUID': 'uuid',
}

// 操作常量的命名
const OPERATION = {
    'CHECK_QRCODE':'check_qrcode',
    'CHECK_SMS_CODE':'check_sms_code',
    'SET_PASSWORD':'set_password',
    'SMS_LEFT_TIME':'sms_left_time',
    'REGISTER_NOW':'register_now',
    'SUCCESS_REGISTER':'success_register',
    'LOGIN_OPERATION':'login_operation',
    'NETWORK_CHECK':'network_check',
    'CLEAR_REDUX':'clear_redux',
    'LOGIN_SUCCESS':'login_success',
    'UPDATE_TOKEN':'update_token',

    // redux存储结构键名
    'REGISTER_MODEL':'register_model',
    'LOGIN_MODEL':'login_model',
    'FIND_PASSWORD_MODEL':'find_password_model',

    // 以下是各种常量配置
    'CLIENT_NAME':'pc_explorer_client',
    'CLIENT_CODE':'pc_explorer_code',
    'CLIENT_VERSION':'1.0.0',
    'DEVICE_TYPE':'windows-pc',
}

export {HOST,ACTION,OPERATION}