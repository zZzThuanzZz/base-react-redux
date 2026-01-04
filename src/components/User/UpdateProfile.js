import { FcPlus } from 'react-icons/fc';
import './UpdateProfile.scss'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { postUpdateProfile } from '../../services/apiService';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { UPDATE_PROFILE_SUCCESS } from '../../redux/action/userAction';

const UpdateProfile = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState('');
    const dispatch = useDispatch();
    const account = useSelector(state => state.user.account)

    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            setUserName(account.username);
            setEmail(account.email);
            setRole(account.role);
            setImage('');
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64,${account.image}`)
            };
        }
    }, [account])

    const handleUploadImage = (event) => {
        if (event.target && event.target.value && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const handleUpdateProfile = async () => {
        let res = await postUpdateProfile(userName, image);
        console.log('check res: ', res)

        if (res.EC === 0) {
            toast.success(res.EM)


            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: {
                    username: res.DT.username,
                    image: res.DT.userImage // hoặc image mới từ backend
                }
            });
            return;
        }
        if (res.EC === 400) {
            toast.error(res.EM)
            return;
        }
    }
    return (
        <>
            <form className="row g-3">
                <div className="col-md-4">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        value={email}
                        disabled
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Vai trò</label>
                    <select className="form-select"
                        onChange={(event) => setRole(event.target.value)}
                        disabled
                        value={role}
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>

                <div className='col-md-12'>
                    <label className="form-label label-upload" htmlFor='lableUpload'>
                        <FcPlus />Upload File Image
                    </label>
                    <input
                        type='file'
                        id='lableUpload' hidden
                        onChange={(event) => handleUploadImage(event)}
                    />
                </div>
                <div className='col-md-12 img-preview'>
                    {previewImage ?
                        <img src={previewImage} />
                        :
                        <span>Preview Image </span>
                    }
                </div>
            </form>
            <Button className='mt-3' onClick={() => handleUpdateProfile()}>Save changes</Button>
        </>


    )
}
export default UpdateProfile;