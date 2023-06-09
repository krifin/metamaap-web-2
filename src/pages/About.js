import React from 'react'
import './About.css'
import Banner from '../assets/png/about-banner.png'
import { Icon } from 'semantic-ui-react'
import Logo from '../assets/png/house-of-krifin-logo.png'

const About = () => {
    return (
        <div>
            <img src={Banner} className='about-banner' />
            <div className='about-title'>A 3D Search Engine  for Metaverse</div>
            <div className='about-description'>A Web 3.0 search engine is leveraging the power of our proprietary interoperable MCTTP Blockchain Architecture And our custom A.I. model.</div>
            <div className='features'>
                <div className='feature'>
                    <div className='feature-name'>Teleport any digital asset</div>
                    <div className='feature-description'>We are solving interoperability for VR & gaming platforms which can be either on-chain or off-chain.</div>
                </div>
                <div className='feature'>
                    <div className='feature-name'>A.I Experience Recognition</div>
                    <div className='feature-description'>Our custom computer vision-based A.I. model can recognize any 3D asset in our galaxy of prominent digital worlds.</div>
                </div>
                <div className='feature'>
                    <div className='feature-name'>Connect every virtual world</div>
                    <div className='feature-description'>We have mapped 800+ metaverses, digital worlds, games & virtual reality platforms with their assets.</div>
                </div>
            </div>
            <div className='about-header'>ABOUT</div>
            <div className='about-info'>
                <p>
                    Metamaap OR the Map of the entire metaverse ecosystem is a platform which leverages cutting-edge technologies  which connect every single virtual world.
                </p>
                <p>
                    At the core of Metamaap  is a search engine that leverages our proprietary computer vision to recognise & connect 3D assets across various virtual worlds. Using our custom blockchain Layer 3 protocols we can convert any assets both on-chain and off-chain into an interoperable asset while ensuring fast and secure transactions that provide users with complete control over their digital assets.
                </p>
                <p>
                    This platform also serves as the official metaverse mapping and authorisation platform for the metaverse council and we are responsible for assigning the metaverse ID to every web3 virtual world in the ecosystem.
                </p>

                <p>
                    With a team of experienced entrepreneurs and technology executives, We are creating innovative solutions that push the boundaries of what is possible in the virtual world. With metamaap, we are breaking down barriers and enabling a new era of interconnectedness that will revolutionize the gaming and VR industries.
                </p>
            </div>

            <div className='footer'>
                <div className='footer-items'>
                    <img src={Logo} width={316} />
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
            </div>
        </div>
    )
}

export default About