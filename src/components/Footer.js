import { Icon } from 'semantic-ui-react'
import Logo from '../assets/png/house-of-krifin-logo.png'
import './Footer.css'
import { Link } from 'react-router-dom';
const footer = () => {
    return (
        <div className='footer'>
            <div className='footer-items'>
                <div className='footer-header'>PAGES</div>
                <div className="footer-border" />
                <Link to="/home" className='footer-item'>Home</Link>
                <Link to="/about" className="footer-item">About</Link>
                <Link to="/partners" className="footer-item">Partners</Link>
                <Link to="https://www.krifin.in/" target='_blank' className="footer-item">House of Krifin</Link>
            <Link to="https://www.metaversecouncil.io/" target='_blank' className="footer-item">Metaverse Council</Link>
            </div>
            <div className='footer-items'>
                <div className='footer-header'>CONTACT US</div>
                <div className="footer-border" />
                <a href='mailto:ea@krifin.in' className='footer-item'>ea@krifin.in</a>
            </div>
            <div className='footer-items'>
                <div className='footer-header'>COMPANY</div>
                <div className="footer-border" />
                <a href='https://www.metaversecouncil.io/terms-conditions' className='footer-item'>Terms & Services</a>
                <a href='https://www.metaversecouncil.io/privacy-policy' className='footer-item'>Privacy Policy</a>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
                <div className='footer-items'>
                    <div className='footer-header'>ADDRESS</div>
                    <div className="footer-border" />
                    <div className='footer-item'>
                        Corporate office: 440, Barhi HSIIDC Industrial area, Phase II, Barhi, Kundali , Haryana- 131101, India
                    </div>
                    <div className='footer-header'>FOLLOW US</div>
                    <div className="footer-border" />
                    <div className='socials'>
                        <Icon name='twitter' size='big' className='white' />
                        <Icon name='telegram plane' size='big' className='white' />
                        <Icon name='discord' size='big' className='white' />
                        <Icon name='linkedin square' size='big' className='white' />
                    </div>
                </div>
            </div>
            <div className='footer-items'>
                <img src={Logo} width={316} />
            </div>
        </div>
    );
}

export default footer;