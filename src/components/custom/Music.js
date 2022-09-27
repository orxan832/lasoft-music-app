import React from 'react'

const Music = props => {
    return (
        <li
            key={props.id}
            className={`pl-5 pr-6 py-2 flex items-center space-x-4 hover:bg-blue-100 ${props.selectedMusicId === props.id ? 'bg-blue-200' : ''} cursor-pointer`}
            onClick={() => props.selectedMusicIdHandler(props.id)}>
            <img width={70} height={70} src={props.cover} alt={`image-${props.id}`} />
            <div className="flex flex-col text-gray-500 font-semibold">
                <p>{props.name}</p>
                <small>{props.artist}</small>
            </div>
        </li>
    )
}

export default Music;