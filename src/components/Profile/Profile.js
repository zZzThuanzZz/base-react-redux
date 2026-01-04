import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ChangePassword from '../Auth/ChangePassword';
import UpdateProfile from '../User/UpdateProfile';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ListHistory from '../Admin/Content/ListHistory';

const Profile = (props) => {
    const { show, setShow } = props;
    const handleClose = () => setShow(false);
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal
                show={show}
                size='xl'
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Quản Lí Thông Tin Người Dùng</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Tabs
                        defaultActiveKey="maininfor"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="maininfor" title="Main Infor">
                            <UpdateProfile />
                        </Tab>
                        <Tab eventKey="changepassword" title="Change Password">
                            <ChangePassword />
                        </Tab>
                        <Tab eventKey="history" title="History">
                            <PerfectScrollbar style={{ maxHeight: '400px' }}>
                                <ListHistory />
                            </PerfectScrollbar>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Profile;