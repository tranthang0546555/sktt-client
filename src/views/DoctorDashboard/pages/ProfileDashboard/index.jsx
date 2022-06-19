import { useSelector } from "react-redux";
import UserApi from '../../../../api/userApi';
import ProfileForm from "./ProfileForm";
import { useSnackbar } from 'notistack'

function ProfileDashboard(props) {
    const { enqueueSnackbar } = useSnackbar()
    const accessToken = useSelector(state => state.user.current?.accessToken)
    const onSubmit = async (data) => {
        console.log(data)
        await UserApi.updateProfileDoctor(data, accessToken).then(res => {
            console.log(res)
            enqueueSnackbar(res.message, { variant: 'success' })
            window.location.reload()
        }).catch(error => { })

    }

    const handleChangeAvatar = async (avatar) => {
        const form = new FormData()
        form.append('avatar', avatar)
        await UserApi.setAvatarDoctor(form, accessToken).then(res => {
            // const action = reloadUser(res)
            // dispatch(action)
            window.location.reload()
            enqueueSnackbar(res.message, { variant: 'success' })
        }).catch(error => { console.log(error) })
    }

    return (
        <div>
            <ProfileForm onSubmit={onSubmit} handleChangeAvatar={handleChangeAvatar} />
        </div>
    );
}

export default ProfileDashboard;