import videoHomepage from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    src={videoHomepage}
                    type="video/mp4"
                />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>
                    {t('homepage.homepage-content.title1')}
                </div>
                <div className='title-2'>
                    {t('homepage.homepage-content.title2')}
                </div>
                <div className='title-3'>
                    {isAuthenticated === false ?
                        <button onClick={() => navigate('/login')}> {t('homepage.homepage-content.title3.login')}</button>
                        :
                        <button onClick={() => navigate('/users')}>{t('homepage.homepage-content.title3.users')}</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage;