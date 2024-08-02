import { SongContext } from "../../context/SongContext"
import React, { useContext, useMemo } from "react"

const SongLyrics = () => {
    const {  lyrics, primaryIndex, karaoke, ttitle, subArray, subIndex, primColor, secColor,
        primAnimation, secAnimation } = useContext(SongContext);

        const text_lyrics = useMemo(() => {
            return lyrics.map((lines, index) => {
                const isTextInSub = subArray?.with?.includes(index);
                const animationDelay = isTextInSub ? subArray.delay[subArray.with.indexOf(index)] : "0s"; // Get the corresponding delay if the line is in subArray
                
                return (
                    <React.Fragment key={index}>
                        <div>
                            {lines.line.map((line, lineIndex) => (
                                <div className='song_lyric_line' key={lineIndex}>
                                    <span
                                        className={`${karaoke && index === primaryIndex && lineIndex === subIndex ? primAnimation : ''} ${karaoke && isTextInSub ? secAnimation : ''}`}
                                        style={{
                                            '--animation-duration': lines.duration[lineIndex],
                                            '--animation-delay': animationDelay,
                                            '--secondary-color': secColor,
                                            '--primary-color': primColor,
                                            '--steps': line.length
                                        }}
                                        title={line}
                                    >
                                        {line === "" ? <br /> : line}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </React.Fragment>
                );
            });
        }, [lyrics, primaryIndex, subArray, subIndex, karaoke, primColor, secColor, primAnimation, secAnimation]);

    return (
        <div className="song_lyric">
            <div className="song_lyric_text">
                <h1>{ttitle}</h1>
                <div className="song_lyric_scrollable">{text_lyrics}</div>
            </div>
        </div>
    )
}

export default SongLyrics