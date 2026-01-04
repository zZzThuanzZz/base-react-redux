import './ManageQuiz.scss';
import Select from 'react-select';
import { useState } from 'react';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import { useTranslation, Trans } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const options = [
    { value: 'EASY', label: 'EASY/DỄ' },
    { value: 'MEDIUM', label: 'MEDIUM/VỪA' },
    { value: 'HARD', label: 'HARD/KHÓ' },
];

const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [reloadUser, setReloadUser] = useState(false);
    const { t } = useTranslation();

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleSubmitQuiz = async () => {
        //validate
        if (!name || !description) {
            toast.error('Name/Description is required');
            return;
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setDescription('');
            setImage(null);
            setReloadUser(prev => !prev)
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <div className="quiz-container">
            {/* <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{t('managequiz.title7')}</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">{t('managequiz.title1')}</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='your quiz name'
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label>{t('managequiz.title2')}</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='description...'
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label >Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={"Quiz type..."}
                                    />
                                </div>
                                <div className="more-actions form-group">
                                    <label className='mb-1'>{t('managequiz.title3')}</label>
                                    <input
                                        type="file"
                                        className='form-control'
                                        onChange={(event) => handleChangeFile(event)}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <button
                                        onClick={() => handleSubmitQuiz()}
                                        className='btn btn-warning'>{t('managequiz.title3')}</button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <TableQuiz reloadUser={reloadUser} />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>{t('managequiz.title4')}</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>{t('managequiz.title5')}</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion> */}
            <Tabs
                defaultActiveKey="managequizz"
                id="uncontrolled-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="managequizz" title={t('managequiz.quiz-container.tab-managequizz.title1')}>

                    <div className="add-new">
                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-3">{t('managequiz.quiz-container.tab-managequizz.add-new.title1')}</legend>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='your quiz name'
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <label>{t('managequiz.quiz-container.tab-managequizz.add-new.title2')}</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='description...'
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                <label >{t('managequiz.quiz-container.tab-managequizz.add-new.title3')}</label>
                            </div>
                            <div className='my-3'>
                                <Select
                                    defaultValue={type}
                                    onChange={setType}
                                    options={options}
                                    placeholder={"Quiz type..."}
                                />
                            </div>
                            <div className="more-actions form-group">
                                <label className='mb-1'>{t('managequiz.quiz-container.tab-managequizz.add-new.title4')}</label>
                                <input
                                    type="file"
                                    className='form-control'
                                    onChange={(event) => handleChangeFile(event)}
                                />
                            </div>
                            <div className='mt-3'>
                                <button
                                    onClick={() => handleSubmitQuiz()}
                                    className='btn btn-warning'>{t('managequiz.quiz-container.tab-managequizz.add-new.title5')}</button>
                            </div>
                        </fieldset>
                    </div>
                    <div className="list-detail">
                        <TableQuiz reloadUser={reloadUser} />
                    </div>
                </Tab>
                <Tab eventKey="quizqa" title={t('managequiz.quiz-container.tab-quizqa.title1')}>
                    <QuizQA />
                </Tab>
                <Tab eventKey="assignquiz" title={t('managequiz.quiz-container.tab-assignquiz.title1')}>
                    <AssignQuiz />
                </Tab>
            </Tabs>

        </div>
    )
}

export default ManageQuiz;