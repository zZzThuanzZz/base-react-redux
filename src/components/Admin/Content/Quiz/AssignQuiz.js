import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';

const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    const { t } = useTranslation();

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
                    label: `${item.id} - ${item.name}`
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

    const handleAssign = async () => {
        let rs = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        if (rs && rs.EC === 0) {
            toast.success(rs.EM)
        } else {
            toast.error(rs.EM)//15:00
        }
    }
    return (
        <div className="assign-quiz-container row m-3">
            <div className='col-6 form-group'>
                <label className='mb-2 title1'>{t('assignquizz.assign-quiz-container.title1')}</label>
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
                <label className='mb-2 title2'>{t('assignquizz.assign-quiz-container.title2')}</label>
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
                <button
                    className='btn btn-warning mt-3'
                    onClick={() => handleAssign()}
                >{t('assignquizz.btn-warning')}</button>
            </div>
        </div>
    )
}
export default AssignQuiz;