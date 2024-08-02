import { useState, useContext } from 'react'
import { SongContext } from '../../context/SongContext'

const AnimationPicker = () => {
    const { setPrimAnimation, setSecAnimation } = useContext(SongContext)
    const [primSelector, setPrimSelector] = useState('p1')
    const [secSelector, setSecSelector] = useState('s1')

    const handleTextAnimation = (choice) => {
    const selection = choice[0];
    
    if (selection === 'p') {
        setPrimAnimation(choice === 'p1' ? 'highlight' : 'static');
        setPrimSelector(choice);
    }
    
    if (selection === 's') {
        setSecAnimation(choice === 's1' ? 'text-wipe' : 'typewriter');
        setSecSelector(choice);
    }
    }

    return (
        <div className='txt'>
          <h4>Text Animations</h4>
          <div className='txt_inside'>
            <li className='txt_side'>
              <h5>Primary</h5>
              <button onClick={() => handleTextAnimation('p1')} className={`${primSelector === 'p1' ? 'txt_selected' : 'txt_choice'}`}>Highlight Wipe</button>
              <button onClick={() => handleTextAnimation('p2')} className={`${primSelector === 'p2' ? 'txt_selected' : 'txt_choice'}`}>Glitch</button>
            </li>
            <li className='txt_side'>
              <h5>Secondary</h5>
              <button onClick={() => handleTextAnimation('s1')} className={`${secSelector === 's1' ? 'txt_selected' : 'txt_choice'}`}>Text Wipe</button>
              <button onClick={() => handleTextAnimation('s2')} className={`${secSelector === 's2' ? 'txt_selected' : 'txt_choice'}`}>Typewriter</button>
            </li> 
          </div>
        </div>
    )
}

export default AnimationPicker