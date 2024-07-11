// 导入request.js请求工具
import request from '@/utils/request.js'
import { Sha256 } from '@/utils/sha256.js';

// 提供调用注册接口的函数
export const userRegisterService = (registerData) => {
    registerData.password = Sha256(registerData.password)
    //借助于UrlSearchParams完成传递
    const params = new URLSearchParams()
    for (let key in registerData)
        params.append(key, registerData[key]);
    console.log(params)
    return request.post('/user/register', params);
}

// 提供调用登录接口的函数
export const userLoginService = (loginData) => {
    loginData.password = Sha256(loginData.password)
    const params = new URLSearchParams();
    for (let key in loginData)
        params.append(key, loginData[key])
    return request.post('/user/login', params)
}

// 获取用户详细信息
export const userInfoService = () => {
    return request.get('/user/getuser')
}

// 检查邮箱是否可用
export const checkEmailService = (email) => {
    const params = new URLSearchParams();
    params.append('email', email)
    return request.post('/user/checkemail', params)
}

// 修改个人信息
export const userInfoUpdateService = (userInfoData) => {
    return request.put('/user/updateuserinfo', userInfoData)
}

// 修改头像
export const userAvatarUpdateService = (avatarUrl) => {
    const params = new URLSearchParams();
    params.append('avatarUrl', avatarUrl)
    return request.patch('/user/updateavatar', params)
}

// 修改密码
export const userPasswordUpdateService = (oldPassword, newPassword) => {
    oldPassword = Sha256(oldPassword)
    newPassword = Sha256(newPassword)
    const params = new URLSearchParams();
    params.append('oldPassword', oldPassword)
    params.append('newPassword', newPassword)
    return request.post('/user/updatepassword', params)
}