import request from '@/utils/request.js'

export const getUserAbility = () => {
    return request.get('/ability/get')
}

export const chat = (UserChatData) => {
    return request.post('/ai/chat', UserChatData)
}

export const getQuestion = (userAbility) => {
    return request.post('/exam/question', userAbility)
}

export const getAnswer = (id, userAnswer) => {
    const params = new URLSearchParams();
    params.append('id', id);
    params.append('userAnswer', userAnswer);
    return request.post('/exam/answer', params)
}

export const getDownloadList = () => {
    return request.get('/downloadlist')
}

export const getWebsites = () => {
    return request.get('/websites')
}