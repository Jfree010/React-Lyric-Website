import { HexColorPicker, HexColorInput } from 'react-colorful'
import Symbols from '../Symbols';
import { SongContext } from '../../context/SongContext';
import { useContext, useState } from 'react';

const ColorPicker = () => {
    const [colorselector, setColorSelector] = useState('p')
    const { setPrimColor, primColor, setSecColor, secColor } = useContext(SongContext)

    const handleColorChoice = (choice) => {setColorSelector(choice)}

    return (
        <div className='clr'>
        <div className='clr_back'>
          <button onClick={() => handleColorChoice('p')} className={`clr_choice clr_p ${colorselector === 'p' ? 'clr_selected' : ''}`}><Symbols name="leftArrow2"/>
            <span>main color</span></button>
          <button onClick={() => handleColorChoice('s')} className={`clr_choice clr_s ${colorselector === 's' ? 'clr_selected' : ''}`}><Symbols name="leftArrow2"/>
            <span> second color</span></button>
        </div>

        <div> {colorselector === 'p' ? (<div className='clr_box'>
                <span className='clr_input'><HexColorInput color={primColor} onChange={setPrimColor}/></span>
                <span><HexColorPicker color={primColor} onChange={setPrimColor}/></span>
              </div>
            ) : ''}
        </div>

        <div> {colorselector === 's' ? (<div className='clr_box'>
                <span className='clr_input'><HexColorInput color={secColor} onChange={setSecColor}/></span>
                <span><HexColorPicker color={secColor} onChange={setSecColor}/></span>
              </div>
            ) : ''}
        </div>
      </div>
    )
}

export default ColorPicker