import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUsers } from '../../../../services/apiService';
const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }

            })
            setListQuiz(newQuiz)
        }
    }
    const fetchUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }

            })
            setListUser(users)
        }
    }
    return (
        <div className="assign-quiz-container row">
            <div className='col-6 form-group'>
                <label className='mb-2'>Select Quiz:</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                    //cái styles để làm background nó k bị trong suốt do xung đột thằng select
                    styles={{
                        menu: (provided) => ({
                            ...provided,
                            zIndex: 9999,
                            backgroundColor: 'rgba(255,255,255,0.9)', // trắng đục
                        }),
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: 'white',
                        }),
                    }}
                />
            </div>
            <div className='col-6 form-group'>
                <label className='mb-2'>Select User:</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                    //cái styles để làm background nó k bị trong suốt do xung đột thằng select
                    styles={{
                        menu: (provided) => ({
                            ...provided,
                            zIndex: 9999,
                            backgroundColor: 'rgba(255,255,255,0.9)', // trắng đục
                        }),
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: 'white',
                        }),
                    }}
                />
            </div>
            <div>
                <button className='btn btn-warning mt-3'>Assign</button>
            </div>
        </div>
    )
}
export default AssignQuiz;