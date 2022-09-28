import { useEffect, useMemo, useState } from 'react';
import musicList from '../data/musicList';
import { ImStop2, ImPlay2, ImPrevious2, ImNext2 } from 'react-icons/im';

const Index = ({ selectedMusicId, selectedMusicIdHandler }) => {

    const [audio, setAudio] = useState(null);
    const [isAudioPaused, setIsAudioPaused] = useState(false);
    const [time, setTime] = useState({
        currentTime: '0.00',
        duration: '0.00',
        inputRangeValue: 0,
        inputMaxValue: 0
    });

    const selectedMusic = musicList.find(item => item.id === selectedMusicId);

    const calculateTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`
    }

    const calculateInputMaxValue = (timeString) => {
        const timeArray = timeString.split(':');
        return (+timeArray[0] * 60) + (+timeArray[1]);
    }

    useEffect(() => {
        const newAudio = new Audio();
        setAudio(newAudio);
        newAudio.addEventListener('pause', () => setIsAudioPaused(true));
        newAudio.addEventListener('play', () => setIsAudioPaused(false));
        newAudio.addEventListener('timeupdate', () => {
            const currentTime = calculateTime(newAudio.currentTime)
            const duration = calculateTime(newAudio.duration);
            const inputMaxValue = calculateInputMaxValue(duration);
            if (currentTime !== 'NaN:NaN' && duration !== 'NaN:NaN') {
                setTime(prev => {
                    return { currentTime, duration, inputRangeValue: prev.inputRangeValue + 0.25, inputMaxValue }
                });
            }
        });

        return () => newAudio.pause();
    }, []);

    // I use this use effect because not to destroy main useEffect work process
    useEffect(() => {
        audio && audio.addEventListener('ended', () => changeToNextMusic());
    }, [audio, selectedMusicId]);

    useEffect(() => {
        if (selectedMusic) {
            audio.src = selectedMusic.audio;
            audio.play();
            setTime({
                currentTime: '0.00',
                duration: '0.00',
                inputRangeValue: 0,
                inputMaxValue: 0
            });
        }
    }, [selectedMusic, audio]);

    const changeToNextMusic = () => {
        const selectedMusicIndex = musicList.findIndex(item => item.id === selectedMusicId);
        if (selectedMusicIndex + 1 === musicList.length) selectedMusicIdHandler(musicList[0].id);
        else selectedMusicIdHandler(musicList[selectedMusicIndex + 1].id);
    }

    const changeToPreviousMusic = () => {
        const selectedMusicIndex = musicList.findIndex(item => item.id === selectedMusicId);
        if (selectedMusicIndex - 1 === -1) selectedMusicIdHandler(musicList[musicList.length - 1].id);
        else selectedMusicIdHandler(musicList[selectedMusicIndex - 1].id);
    }

    const changeAudioTrack = e => {
        const { value } = e.target;
        audio.pause();
        setTime(prev => ({
            ...prev,
            inputRangeValue: +value - 0.25
        }));
        audio.currentTime = Math.floor(+value);
        audio.play();

    };

    const renderSelectedMusic = () => {
        if (!selectedMusicId) return null;
        return <div className='flex flex-col items-center mt-12 w-full'>
            <img width={400} height={400} src={selectedMusic.cover} className='rounded-full' />
            <p className='font-semibold text-gray-500 mt-12'>{selectedMusic.artist}</p>
            <p className='text-2xl text-gray-800 font-bold mt-16'>Player</p>
            <div className='flex space-x-5 mt-12 w-1/2'>
                <p>{time.currentTime}</p>
                <input type='range' className='w-full outline-none' min='0' max={time.inputMaxValue} step='0.25' value={time.inputRangeValue} onChange={changeAudioTrack} />
                <p>{time.duration}</p>
            </div>
            <div className='flex justify-between mt-12 w-1/4 text-slate-800'>
                <button onClick={changeToPreviousMusic}>
                    <ImPrevious2 size='1.5rem' />
                </button>
                {isAudioPaused ? <button onClick={() => audio.play()}>
                    <ImPlay2 size='1.5rem' />
                </button> :
                    <button onClick={() => audio.pause()}>
                        <ImStop2 size='1.5rem' />
                    </button>}

                <button onClick={changeToNextMusic}>
                    <ImNext2 size='1.5rem' />
                </button>
            </div>
        </div >
    };

    return (
        <div className="w-4/5 h-full flex justify-center">
            {renderSelectedMusic()}
        </div>
    )
}

export default Index;