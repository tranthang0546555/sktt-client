import axiosClient from './axiosClient'

const getApi = {

    getDoctors() {
        const url = '/api/v1/home/getDoctors'
        return axiosClient.get(url)
    },

    chooseTime(doctorId) {
        const url = `/api/v1/home/chooseTime?doctorId=${doctorId}`
        return axiosClient.get(url)
    },

    getDoctor(doctorId) {
        const url = `/api/v1/home/getDoctor/${doctorId}`
        return axiosClient.get(url)
    },

    search(searchInput) {
        const url = `/api/v1/home/search?input=${searchInput}`
        return axiosClient.get(url)
    },

    getIntro() {
        const url = `/api/v1/home/getIntro`
        return axiosClient.get(url)
    },

    getUI() {
        const url = `/api/v1/home/getUI`
        return axiosClient.get(url)
    },

}

export default getApi