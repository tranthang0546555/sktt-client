import axiosClient from './axiosClient'

const userApi = {

    register(data) {
        const url = '/api/v1/auth/register'
        return axiosClient.post(url, data)
    },

    login(data) {
        const url = '/api/v1/auth/login'
        return axiosClient.post(url, data)
    },

    authTokenLogin(data) {
        const url = '/api/v1/auth/token'
        return axiosClient.post(url, data)
    },

    setAvatarDoctor(data, accessToken) {
        const url = '/api/v1/doctor/avatar'
        return axiosClient.post(url, data, {
            headers: {
                'x_authorization': `${accessToken}`
            }
        })
    },

    setAvatarUser(data, accessToken) {
        const url = '/api/v1/user/avatar'
        return axiosClient.post(url, data, {
            headers: {
                'x_authorization': `${accessToken}`
            }
        })
    },

    updateProfileDoctor(data, accessToken) {
        const url = '/api/v1/doctor/updateProfile'
        return axiosClient.post(url, data, {
            headers: {
                'x_authorization': `${accessToken}`
            }
        })
    },

    updateProfileUser(data, accessToken) {
        const url = '/api/v1/user/updateProfile'
        return axiosClient.post(url, data, {
            headers: {
                'x_authorization': `${accessToken}`
            }
        })
    },



    addTimeServing(data, accessToken) {
        const url = '/api/v1/doctor/addTimeServing'
        return axiosClient.post(url, data, {
            headers: {
                'x_authorization': `${accessToken}`
            }
        })
    },

    getTimeServing(accessToken) {
        const url = '/api/v1/doctor/getTimeServing'
        return axiosClient.get(url, {
            headers: {
                'x_authorization': `${accessToken}`
            }
        })
    },

    resetTimeServing(data, accessToken) {
        const url = '/api/v1/doctor/resetTimeServing'
        return axiosClient.post(url, data, {
            headers: {
                'x_authorization': `${accessToken}`
            }
        })
    },


    scheduling(data, accessToken) {
        const url = '/api/v1/user/scheduling'
        return axiosClient.post(url, data, {
            headers: {
                'x_authorization': `${accessToken}`
            }
        })
    },

    getScheduleUser(accessToken) {
        const url = '/api/v1/user/getScheduleUser'
        return axiosClient.get(url, {
            headers: {
                'x_authorization': `${accessToken}`
            }
        })
    },

    getScheduleDoctor(accessToken) {
        const url = '/api/v1/doctor/getScheduleDoctor'
        return axiosClient.get(url, {
            headers: {
                'x_authorization': `${accessToken}`
            }
        })
    },

    joinRoom(codeRoom, accessToken) {
        const url = `/api/v1/room/${codeRoom}`
        return axiosClient.get(url, {
            headers: {
                'x_authorization': `${accessToken}`
            }
        })
    },

    getNotification(accessToken) {
        const url = `/api/v1/getNotification`
        return axiosClient.get(url, {
            headers: {
                'x_authorization': `${accessToken}`
            }
        })
    },

    readNotification(notiId, accessToken) {
        const url = `/api/v1/readNotification`
        return axiosClient.post(url, { notiId }, {
            headers: {
                'x_authorization': `${accessToken}`
            }
        })
    },

    getDiseasePosts(accessToken) {
        const url = `/api/v1/doctor/getDiseasePosts`
        return axiosClient.get(url, {
            headers: {
                'x_authorization': `${accessToken}`
            }
        })
    }
}

export default userApi