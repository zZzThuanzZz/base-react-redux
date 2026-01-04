import { getHistory } from '../../../services/apiService';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import vi from "moment/locale/vi";
const ListHistory = () => {
    const [listHistory, setListHistory] = useState([]);
    useEffect(() => {
        fetchHistory()
    }, [])

    const fetchHistory = async () => {
        let res = await getHistory();
        if (res && res.EC === 0) {
            let newData = res?.DT?.data?.map(item => {
                return {
                    total_correct: item.total_correct,
                    total_question: item.total_question,
                    name: item?.quizHistory?.name ?? "",
                    id: item.id,
                    date: moment(item.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A')
                }
            })
            if (newData.length > 7) {
                newData = newData.slice(newData.length - 7, newData.length);
            }
            setListHistory(newData);
        }
        console.log('>>check res: ', res)
    }
    return (
        <div>
            <table className='table table-hover table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Quiz Name</th>
                        <th>Total Question</th>
                        <th>Total Correct</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory.length > 0 &&
                        listHistory.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.total_question}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{item.date}</td>
                                </tr>
                            )
                        })}
                    {listHistory && listHistory.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>Not found data</td>
                        </tr>}
                </tbody>
            </table>
        </div>
    )
}
export default ListHistory;