import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { postChangepassword } from '../../services/apiService';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordAgain, setNewPasswordAgain] = useState("");

    const handleChangepassword = async () => {
        if (!currentPassword) {
            toast.error('"Current password" is not allowed to be empty')
            return;
        }
        if (!newPassword) {
            toast.error('"New password" is not allowed to be empty')
            return;
        }
        if (!newPasswordAgain) {
            toast.error('"New password again" is not allowed to be empty')
            return;
        }
        if (newPassword !== newPasswordAgain) {
            toast.error('"New password" and "New password again" are not match')
            return;
        }
        let rs = await postChangepassword(currentPassword, newPassword)
        console.log('>>>check rs: ', rs)

        if (rs.EC === 0) {
            toast.success(rs.EM)
            setCurrentPassword('')
            setNewPassword('')
            setNewPasswordAgain('')
            return;
        }
        if (rs.EC === -2) {
            toast.error(rs.EM)
            return;
        }
    }
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Mật khẩu hiện tại: </Form.Label>
                <Form.Control
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Mật khẩu mới: </Form.Label>
                <Form.Control
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Nhập lại mật khẩu mới: </Form.Label>
                <Form.Control
                    value={newPasswordAgain}
                    onChange={(event) => setNewPasswordAgain(event.target.value)}
                />
            </Form.Group>
            <Button onClick={() => handleChangepassword()}>Save changes</Button>
        </Form>
    )
}
export default ChangePassword;