import { useMemo } from 'react';
import musicList from '../../data/musicList';

const Sidebar = ({ selectedMusicId, selectedMusicIdHandler }) => {

    const renderMusicList = useMemo(() => musicList.map(item =>
        <li
            key={item.id}
            className={`pl-5 pr-6 py-2 flex items-center space-x-4 hover:bg-blue-100 ${selectedMusicId === item.id ? 'bg-blue-200' : ''} cursor-pointer`}
            onClick={() => selectedMusicIdHandler(item.id)}>
            <img width={70} height={70} src={item.cover} alt={`image-${item.id}`} />
            <div className="flex flex-col text-gray-500 font-semibold">
                <p>{item.name}</p>
                <small>{item.artist}</small>
            </div>
        </li>), [selectedMusicId]);

    return (
        <div className="w-1/5 shadow-2xl flex flex-col">
            <label className="p-5 font-bold text-2xl mt-2">Library</label>
            <ul className="mt-2 pr-1 list-none flex-flex-col">
                {renderMusicList}
            </ul>
        </div>
    )
}

export default Sidebar