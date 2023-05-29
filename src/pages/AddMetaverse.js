import React from 'react'
import './AddMetaverse.css'
import useFirebase from '../adaptors/useFirebase';

const AddMetaverse = () => {
  const [state, setState] = React.useState({
    email: '',
    name: '',
    category: 'Multiplayer Arcade Game',
    description: '',
    logo: '',
    image: '',
    website: '',
    instagram: '',
    demo: '',
    linkedin: '',
    firstName: '',
    preferredName: '',
    lastName: '',
    phone: '',
    nationality: '',
    city: '',
    twitter: '',
    interests: [],
    discord: '',
    disclaimer: '',
  });

  const { addMetaverse, getUser } = useFirebase();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      setState((prevState) => ({
        ...prevState,
        interests: [...prevState.interests, e.target.value],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        interests: prevState.interests.filter((interest) => interest !== e.target.value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var validate = input.reportValidity();
      if (!validate) {
        return;
      }
    }
    const options = [
      { id: 1, name: 'Multiplayer Arcade Game' },
      { id: 2, name: 'Fantasy World/Game' },
      { id: 3, name: 'Retail/Commercial Brand Experience' },
      { id: 4, name: 'Influencer/Celebrity World' },
      { id: 5, name: 'Educational/Cultural Experience' },
      { id: 6, name: 'Artistic Immersive Experience' },
    ];

    const selectedOption = options.find((option) => option.name === state.category).id;
    console.log(selectedOption)
    const categoryRanges = {
      1: { minX: 0, maxX: 167 },
      2: { minX: 201, maxX: 334 },
      3: { minX: 401, maxX: 500 },
      4: { minX: 601, maxX: 667 },
      5: { minX: 801, maxX: 834 },
      6: { minX: 1001, maxX: 1000 },
    };

    // Generate random values within the range of the selected category
    const categoryRange = categoryRanges[selectedOption];
    console.log(categoryRange)
    const x = Math.floor(Math.random() * 1000);
    const y = Math.floor(Math.random() * 1000);
    const z = Math.floor(Math.random() * (categoryRange.maxX - categoryRange.minX + 1)) + categoryRange.minX;

    const id = `${x.toString().padStart(3, '0')}${y.toString().padStart(3, '0')}${z.toString().padStart(3, '0')}`;
    console.log(id)
    addMetaverse({ ...state,id:  id});

    console.log(state);
  };


  return (
    <div className='add-metaverse-container'>
      <div className='add-metaverse-sections'>
        <form action="" method="get" className='add-metaverse-section' style={{ gap: '20px' }}>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='email' name="email" onChange={handleChange} placeholder='Your Email' pattern="[a-zA-Z0-9._-]*@[a-zA-Z]*\.[a-zA-Z]{2,3}" required />
          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='text' name="name" onChange={handleChange} placeholder='Your Metaverse/Game/Experience name' required />
          </div>
          <div className='metaverse-input-box'>
            <select placeholder='Category' className='metaverse-input' name="category" onChange={handleChange}>
              <option value='Multiplayer Arcade Game' style={{ color: 'white', background: 'black' }}>Multiplayer Arcade Game</option>
              <option value='Fantasy World/Game' style={{ color: 'white', background: 'black' }}>Fantasy World/Game</option>
              <option value='Retail/Commercial Brand Experience' style={{ color: 'white', background: 'black' }}>Retail/Commercial Brand Experience</option>
              <option value='Influencer/Celebrity World' style={{ color: 'white', background: 'black' }}>Influencer/Celebrity World</option>
              <option value='Educational/Cultural Experience' style={{ color: 'white', background: 'black' }}>Educational/Cultural Experience</option>
              <option value='Artistic Immersive Experience' style={{ color: 'white', background: 'black' }}>Artistic Immersive Experience</option>
            </select>
          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' name="description" onChange={handleChange} type='text' rows={4} placeholder='Description' required />
          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='url' name='logo' onChange={handleChange} pattern="https://drive.google.com/.+" placeholder='Attach drive link of one Logo of your Metaverse' required />
          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='url' name="image" onChange={handleChange} pattern="https://drive.google.com/.+" placeholder='Attach drive link of one Image of your Metaverse' required />
          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='url' name="website" onChange={handleChange} pattern='(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})' placeholder='Website' required />
          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='url' name="instagram" onChange={handleChange} pattern='https://www.instagram.com/.+' placeholder='Instagram Handle Link' required />
          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='url' name="demo" onChange={handleChange} pattern='(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})' placeholder='Please provide any links to your product demo, or pitch deck' required />
          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='url' name="linkedin" onChange={handleChange} pattern='https://www.linkedin.com/in/.+' placeholder='Founder LinkedIn Profile Link' required />
          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='text' name="firstName" onChange={handleChange} placeholder='First Name' required />
          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='text' name="preferredName" onChange={handleChange} placeholder='Preferred first name (optional)' />
          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='text' name="lastName" onChange={handleChange} placeholder='Last name' required />
          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='tel' name="phone" onChange={handleChange} minLength={10} placeholder='Phone number' required />
          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='text' name="nationality" onChange={handleChange} placeholder='Nationality' required />
          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='text' name='city' onChange={handleChange} placeholder='City' required />
          </div>
          <div className='metaverse-alternative-box'>
            <div>What interests you about Metaverse Council ?</div>
            {/* checkbox options */}
            <div className='metaverse-alternative'>
              <input type='checkbox' id='metaverse-alternative-1' name='interests' onChange={handleCheckboxChange} value='Networking opportunity' />
              <label htmlFor='metaverse-alternative-1'>Networking opportunity</label>
            </div>
            <div className='metaverse-alternative'>
              <input type='checkbox' id='metaverse-alternative-2' name='interests' onChange={handleCheckboxChange} value='Metaverse asset research center' />
              <label htmlFor='metaverse-alternative-2'>Metaverse asset research center</label>
            </div>
            <div className='metaverse-alternative'>
              <input type='checkbox' id='metaverse-alternative-3' name='interests' onChange={handleCheckboxChange} value='CAMLab' />
              <label htmlFor='metaverse-alternative-3'>CAMLab</label>
            </div>
            <div className='metaverse-alternative'>
              <input type='checkbox' id='metaverse-alternative-4' name='interests' onChange={handleCheckboxChange} value='HR support' />
              <label htmlFor='metaverse-alternative-3'>HR support</label>
            </div>
            <div className='metaverse-alternative'>
              <input type='checkbox' id='metaverse-alternative-5' name='interests' onChange={handleCheckboxChange} value='Technical Development support' />
              <label htmlFor='metaverse-alternative-5'>Technical Development support</label>
            </div>
            <div className='metaverse-alternative'>
              <input type='checkbox' id='metaverse-alternative-6' name='interests' onChange={handleCheckboxChange} value='Grant & Investor Access' />
              <label htmlFor='metaverse-alternative-6'>Grant & Investor Access</label>
            </div>
            <div className='metaverse-alternative'>
              <input type='checkbox' id='metaverse-alternative-7' name='interests' onChange={handleCheckboxChange} value='Marketing & Promotion support' />
              <label htmlFor='metaverse-alternative-7'>Marketing & Promotion support</label>
            </div>
            <div className='metaverse-alternative'>
              <input type='checkbox' id='metaverse-alternative-8' name='interests' onChange={handleCheckboxChange} value='Industry Insights & report' />
              <label htmlFor='metaverse-alternative-8'>Industry Insights & report</label>
            </div>
            <div className='metaverse-alternative'>
              <input type='checkbox' id='metaverse-alternative-9' name='interests' onChange={handleCheckboxChange} value='Policy advocacy' />
              <label htmlFor='metaverse-alternative-9'>Policy advocacy</label>
            </div>
            <div className='metaverse-alternative'>
              <input type='checkbox' id='metaverse-alternative-10' name='interests' onChange={handleCheckboxChange} value='Other' />
              <label htmlFor='metaverse-alternative-10'>Other</label>
            </div>

          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='url' name="twitter" onChange={handleChange} pattern="https://twitter.com/.+" placeholder='Twitter Handle' required />
          </div>
          <div className='metaverse-input-box'>
            <input className='metaverse-input' type='text' name="discord" onChange={handleChange} pattern='^.{3,32}#[0-9]{4}$' placeholder='Discord Handle' />
          </div>
          <div className='metaverse-alternative-box'>
            <div className='metaverse-alternative-header'><b>Disclaimer</b></div>
            <div className='metaverse-alternative-description'>Our Foundation is committed to protecting and respecting your privacy, and we’ll only use your personal information to administer your account and to provide the products and services you requested from us. From time to time, we would like to contact you about our products, as well as other content that may be of interest to you. </div>
            <div className='metaverse-alternative-description'><b>You agree to having the data provided processed for the legitimate purpose of the Metaverse Ambassadors Program and receiving communication by Metaverse Council.
              <br />
              <br />
              You also agree that Metaverse Council has the right to make determinations concerning grants at its sole and absolute discretion, and that  Metaverse Council  is under no obligation to offer you a grant; </b></div>
            <div className='metaverse-alternative-description'>You can unsubscribe from these communications at any time with the unsubscribe link provided in each communication sent to you.
              <br />
              By clicking submit below, you consent to allow our Foundation to store and process the personal information submitted above to provide you the content requested.
            </div>
            <div className='metaverse-alternative'>
              <input type='radio' id='metaverse-alternative-1' name='disclaimer' value='Yes' onChange={handleChange} required />
              <label htmlFor='metaverse-alternative-1'>Yes</label>
            </div>
          </div>
          <div className='metaverse-submit-button' onClick={handleSubmit}>Submit</div>
        </form>
        <div className='horizontal-divider' />
        <div className='add-metaverse-section'>
          <div className='add-metaverse-title'>METAMAAP</div>
          <div>As a metaverse council member you get access to a world of opportunities. We assist you in forming networks and partnerships with major leader, corporates, investors and institutions across the globe. As consultative partners in policy making we channelize your inputs in economic and industrial policy frameworks.
            <br />
            Moreover,  Our Metaverse community supports projects that benefit the network with funding from the Metaverse Council treasury & support from our partner resources. We also work with you to develop your metaverse through our CAMlab initiative.
            <br />
            As a member, You may even submit a proposal for a project related to Metaverse world, infrastructure, or app development, marketing, community outreach, educational initiatives, and more.
          </div>
          <div><b>
            Become a Metaverse Member & Get rewarded by Metaverse Council for helping build Web3 & Metaverse Ecosystem.
            <br />
            Membership to Metaverse Council is subject to approval by working & governing council*
            <br />
            There is No membership fee or charges**
          </b></div>
        </div>
      </div>
    </div>
  )
}

export default AddMetaverse