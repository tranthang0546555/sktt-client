import axiosClient from './axiosClient'

const DiseasePostApi = {

    getDiseasePost(option, page) {
        const url = '/api/v1/disease'
        return axiosClient.get(url, { params: { option, page } })
    },

    getDetailDiseasePost(slug) {
        const url = `/api/v1/disease/${slug}`
        return axiosClient.get(url)
    },

    createDiseasePost(data, accessToken) {
        const url = '/api/v1/doctor/create'
        return axiosClient.post(
            url,
            data,
            {
                headers: {
                    'x_authorization': `${accessToken}`
                }
            })
    },
    editDiseasePost(data, accessToken) {
        const url = '/api/v1/doctor/edit'
        return axiosClient.post(
            url,
            data,
            {
                headers: {
                    'x_authorization': `${accessToken}`
                }
            })
    }
    ,
    getComment(postId) {
        const url = `api/v1/comment/get?postId=${postId}`
        return axiosClient.get(url, postId)
    },

    postComment(data) {
        const url = '/api/v1/comment/post'
        return axiosClient.post(url, data)
    },

    deleteComment(commentId) {
        const url = '/api/v1/comment/delete'
        return axiosClient.post(url, { commentId })
    },

    vote(userId, postId) {
        const url = '/api/v1/disease/vote'
        return axiosClient.post(url, { userId, postId })
    }
}
export default DiseasePostApi
