import React, { useContext, useMemo } from 'react';
import { SongContext } from '../context/SongContext';

const SongLyrics = () => {
    const {  lyrics, highIndex, karaoke, ttitle, wipeArray, subIndex } = useContext(SongContext);

    // Memoize the JSX elements to only recompute when either crawling or highIndex changes
    const text_lyrics = useMemo(() => {
      return lyrics.map((lines, index) => {
        const isTextWipe = wipeArray?.with?.includes(index);
        const animationDelay = isTextWipe ? wipeArray.delay[wipeArray.with.indexOf(index)] : "0s"; // Get the corresponding delay if the line is in wipeArray
        const delayColor = isTextWipe ? wipeArray.color[wipeArray.with.indexOf(index)] : "blue";
        
        return (
          <React.Fragment key={index}>
            <div >
              {lines.line.map((line, lineIndex) => (
                <span key={lineIndex} className={`${karaoke && index === highIndex && lineIndex === subIndex ? 'highlight' : ''} ${ karaoke && isTextWipe ? 'text-wipe' : ''}`} 
                  style={{ '--animation-duration': lines.duration[lineIndex], '--animation-delay': animationDelay, '--vocal-color': delayColor}}>
                  {line === "" ? <br /> : line}
                </span>
              ))}
            </div>
              {/* previous code in MERN-lyric_site readme*/}
          </React.Fragment>
        );
      });
    }, [lyrics, highIndex, wipeArray, subIndex, karaoke]);
    

    return (
        <div className='songlyrics'>
            <div className='stext'>
                <h1>{ttitle}</h1>
                {/* <h2>{currentTime}</h2> */}
                <div>{text_lyrics}</div>
            </div>
        </div>
    );
};

export default SongLyrics;

