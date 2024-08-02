const svgs = {
    karaoke: (
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none">
    <g fill="none" strokeWidth="1.5">
        <path fill="currentColor" d="M20.8 8.1a.9.9 0 1 1-1.8 0a.9.9 0 0 1 1.8 0" />
        <path stroke="currentColor" strokeLinecap="round" d="M20.8 8.1a.9.9 0 1 1-1.8 0a.9.9 0 0 1 1.8 0Zm0 0V3.6a.6.6 0 0 1 .6-.6H23" />
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M16 17a2 2 0 1 1 0-4a2 2 0 0 1 0 4" />
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M21.95 13c-.501 5.053-4.765 9-9.95 9c-5.523 0-10-4.477-10-10S6.477 2 12 2a10 10 0 0 1 4 .832" />
        <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M8.5 9a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1m7 0a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1" />
    </g>
</svg>

    ),
    search: (
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 256 256">
            <path fill="currentColor" d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"/></svg>
    ),
    favorite: (
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
	        <path fill="currentColor" d="m5.8 21l1.6-7L2 9.2l7.2-.6L12 2l2.8 6.6l7.2.6l-3.2 2.8H18c-3.1 0-5.6 2.3-6 5.3zM17 14v3h-3v2h3v3h2v-3h3v-2h-3v-3z" />
        </svg>
    ),
    favorite_minus: (
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="currentColor" d="m5.8 21l1.6-7L2 9.2l7.2-.6L12 2l2.8 6.6l7.2.6l-3.2 2.8H18c-3.1 0-5.6 2.3-6 5.3zm8.2-4v2h8v-2z" />
        </svg>
    ),
    playlist: (
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
	        <path fill="currentColor" d="m17 19.1l2.5 1.5l-.7-2.8l2.2-1.9l-2.9-.2L17 13l-1.1 2.6l-2.9.3l2.2 1.9l-.7 2.8zM3 14h8v2H3zm0-8h12v2H3zm0 4h12v2H3z" />
        </svg>
    ),
    animation: (
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 36 36">
            <path fill="currentColor" d="M3.5 23.77a6.41 6.41 0 0 0 9.33 8.67a11.65 11.65 0 0 1-9.33-8.67" />
            <path fill="currentColor" d="M7.68 14.53a9.6 9.6 0 0 0 13.4 13.7a14.11 14.11 0 0 1-13.4-13.7" />
            <path fill="currentColor" d="M21.78 2A12.12 12.12 0 1 1 9.66 14.15A12.12 12.12 0 0 1 21.78 2" />
        </svg>
    ),
    color: (
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
	        <path fill="currentColor" d="M17.5 12a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 17.5 9a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-3-4A1.5 1.5 0 0 1 13 6.5A1.5 1.5 0 0 1 14.5 5A1.5 1.5 0 0 1 16 6.5A1.5 1.5 0 0 1 14.5 8m-5 0A1.5 1.5 0 0 1 8 6.5A1.5 1.5 0 0 1 9.5 5A1.5 1.5 0 0 1 11 6.5A1.5 1.5 0 0 1 9.5 8m-3 4A1.5 1.5 0 0 1 5 10.5A1.5 1.5 0 0 1 6.5 9A1.5 1.5 0 0 1 8 10.5A1.5 1.5 0 0 1 6.5 12M12 3a9 9 0 0 0-9 9a9 9 0 0 0 9 9a1.5 1.5 0 0 0 1.5-1.5c0-.39-.15-.74-.39-1c-.23-.27-.38-.62-.38-1a1.5 1.5 0 0 1 1.5-1.5H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8" />
        </svg>
    ),
    video: (
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
	        <path fill="currentColor" d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11z" />
        </svg>
    ),
    audio: (
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
	        <path fill="currentColor" d="M21 3v12.5a3.5 3.5 0 0 1-3.5 3.5a3.5 3.5 0 0 1-3.5-3.5a3.5 3.5 0 0 1 3.5-3.5c.54 0 1.05.12 1.5.34V6.47L9 8.6v8.9A3.5 3.5 0 0 1 5.5 21A3.5 3.5 0 0 1 2 17.5A3.5 3.5 0 0 1 5.5 14c.54 0 1.05.12 1.5.34V6z" />
        </svg>
    ),
    leftArrow: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 16 16">
            <rect width="16" height="16" fill="none" />
            <path fill="currentColor" d="M10.843 13.069L6.232 8.384a.546.546 0 0 1 0-.768l4.61-4.685a.55.55 0 0 0 0-.771a.53.53 0 0 0-.759 0l-4.61 4.684a1.65 1.65 0 0 0 0 2.312l4.61 4.684a.53.53 0 0 0 .76 0a.55.55 0 0 0 0-.771" />
        </svg>
    ),

    rightArrow: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 16 16">
            <rect width="16" height="16" fill="none" />
            <path fill="currentColor" d="m5.157 13.069l4.611-4.685a.546.546 0 0 0 0-.768L5.158 2.93a.55.55 0 0 1 0-.771a.53.53 0 0 1 .759 0l4.61 4.684a1.65 1.65 0 0 1 0 2.312l-4.61 4.684a.53.53 0 0 1-.76 0a.55.55 0 0 1 0-.771" />
        </svg>
    ), 
    leftArrow2: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 1024 1024">
            <rect width="1024" height="1024" fill="none"/>
            <path fill="currentColor" d="M752.145 0c8.685 0 17.572 3.434 24.237 10.099c13.33 13.33 13.33 35.143 0 48.473L320.126 515.03l449.591 449.591c13.33 13.33 13.33 35.144 0 48.474c-13.33 13.33-35.142 13.33-48.472 0L247.418 539.268c-13.33-13.33-13.33-35.144 0-48.474L727.91 10.1C734.575 3.435 743.46.002 752.146.002z"/>
        </svg>
    ),

    close: (
        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z" />
        </svg>
    ),
    pause: (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <g fill="none">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path fill="currentColor" d="M9 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 0a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
            </g>
        </svg>
    ),
    play: (
        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="currentColor" d="M8 5.14v14l11-7z" />
        </svg>
    ),
    next: (
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 15 15">
            <rect width="15" height="15" fill="none" />
            <path fill="currentColor" d="M1.79 2.093A.5.5 0 0 0 1 2.5v10a.5.5 0 0 0 .79.407l7-5a.5.5 0 0 0 0-.814zM13 13h1V2h-1z" />
        </svg>
    ), 
    previous: (
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 16 16">
            <rect width="16" height="16" fill="none" />
            <path fill="currentColor" d="M14 3.002a1 1 0 0 0-1.578-.816l-7 4.963a1 1 0 0 0-.007 1.628l7 5.037A1 1 0 0 0 14 13.003zM2 2.5a.5.5 0 0 1 1 0v11a.5.5 0 0 1-1 0z" />
        </svg>
    ), 
    upArrow: (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="currentColor" d="m12 10.828l-4.95 4.95l-1.414-1.414L12 8l6.364 6.364l-1.414 1.414z" />
        </svg>
    ),
    downArrow: (
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 10l5 5m0 0l5-5" />
        </svg>
    ),
    globe: (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-.175-.012-.363t-.013-.312q-.125.725-.675 1.2T18 13h-2q-.825 0-1.412-.587T14 11v-1h-4V8q0-.825.588-1.412T12 6h1q0-.575.313-1.012t.762-.713q-.5-.125-1.012-.2T12 4Q8.65 4 6.325 6.325T4 12h5q1.65 0 2.825 1.175T13 16v1h-3v2.75q.5.125.988.188T12 20" />
        </svg>
    ),
    lock: (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm0-2h12V10H6zm6-3q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6zM6 20V10z" />
        </svg>
    ),
    menu: (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="currentColor" d="M3 8h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2m18 8H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2m0-5H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2" />
        </svg>
    ), 
    profile: (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
                <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21" />
            </g>
        </svg>
    ),
    home: (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
        </svg>
    ),
    favorites: (
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="currentColor" d="M22 10.1c.1-.5-.3-1.1-.8-1.1l-5.7-.8L12.9 3c-.1-.2-.2-.3-.4-.4c-.5-.3-1.1-.1-1.4.4L8.6 8.2L2.9 9c-.3 0-.5.1-.6.3c-.4.4-.4 1 0 1.4l4.1 4l-1 5.7c0 .2 0 .4.1.6c.3.5.9.7 1.4.4l5.1-2.7l5.1 2.7c.1.1.3.1.5.1h.2c.5-.1.9-.6.8-1.2l-1-5.7l4.1-4c.2-.1.3-.3.3-.5" />
        </svg>
    ),
    favorites_large: (
        <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="currentColor" d="M22 10.1c.1-.5-.3-1.1-.8-1.1l-5.7-.8L12.9 3c-.1-.2-.2-.3-.4-.4c-.5-.3-1.1-.1-1.4.4L8.6 8.2L2.9 9c-.3 0-.5.1-.6.3c-.4.4-.4 1 0 1.4l4.1 4l-1 5.7c0 .2 0 .4.1.6c.3.5.9.7 1.4.4l5.1-2.7l5.1 2.7c.1.1.3.1.5.1h.2c.5-.1.9-.6.8-1.2l-1-5.7l4.1-4c.2-.1.3-.3.3-.5" />
        </svg>
    ),
    music_note: (
        <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <g fill="none">
                <path stroke="currentColor" strokeWidth="1.5" d="M12 19.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Zm10-2a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z" />
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="m22 8l-10 4" />
                <path fill="currentColor" d="m14.456 5.158l.29.692zm2-.837l-.29-.692zm4.652-.98l-.416.624zM12.75 19V8.847h-1.5V19zm10-1.847V8.011h-1.5v9.143zM14.745 5.85l2-.837l-.579-1.384l-2 .837zm8.005 2.16c0-1.333.002-2.42-.12-3.24c-.123-.837-.4-1.583-1.106-2.054l-.832 1.249c.185.123.355.353.455 1.024c.101.686.103 1.638.103 3.022zm-6.005-2.997c1.276-.534 2.156-.9 2.828-1.072c.657-.167.935-.099 1.12.024l.83-1.249c-.707-.47-1.502-.437-2.32-.228c-.805.205-1.806.626-3.037 1.141zM12.75 8.848c0-.662.001-1.098.037-1.434c.035-.317.095-.474.172-.59l-1.248-.83c-.258.387-.366.805-.415 1.258c-.047.436-.046.967-.046 1.596zm1.416-4.382c-.58.243-1.07.447-1.454.659c-.4.22-.743.48-1.001.868l1.248.831c.077-.115.199-.232.478-.386c.296-.163.698-.333 1.308-.588z" />
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M7 11V2" />
                <circle cx="4.5" cy="10.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M10 5c-1.243 0-3-.929-3-3" />
            </g>
        </svg>
    )
}

const Symbols = ({ name }) => {
    return(
        <div>{svgs[name]}</div>
    )
}

export default Symbols