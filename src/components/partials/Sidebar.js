import { useMemo } from 'react';
import musicList from '../../data/musicList';
import Music from '../custom/Music';

const Sidebar = ({ selectedMusicId, selectedMusicIdHandler }) => {

    const renderMusicList = useMemo(() => musicList.map(item => <Music key={item.id} {...item} selectedMusicId={selectedMusicId} selectedMusicIdHandler={selectedMusicIdHandler} />), [selectedMusicId]);

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