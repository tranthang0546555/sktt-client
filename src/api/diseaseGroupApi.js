import axiosClient from './axiosClient'

const DiseaseGroupApi = {

    getDiseaseGroups() {
        const url = '/api/v1/diseaseGroup'
        return axiosClient.get(url)
    },

    // creategDiseaseGroup(data, accessToken) {
    //     const url = '/api/v1/doctor/create'
    //     return axiosClient.post(
    //         url,
    //         data,
    //         {
    //             headers: {
    //                 'x_authorization': `${accessToken}`
    //             }
    //         })
    // }
}
export default DiseaseGroupApi
