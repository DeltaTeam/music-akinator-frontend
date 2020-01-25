import React from 'react';

export default function SongsList(props) {
    return (
        <div>
            <List songs={props.songs}></List>
        </div>
    )
}

function List(props) {
    let res = [];
    let songs = props.songs;

    res.push(<p key={-1} className='standartTextBlock greyColor'>Songs list:</p>);
    for (let i = 0; i < songs.length; i++) {
        res.push(<p key={i} className='standartTextBlock greyColor'>{songs[i].result.artist} &mdash; {songs[i].result.title}</p>)
        res.push(
            <audio key={i+5} controls>
                <source src={songs[i].result.deezer.preview} key={i+10}></source>
            </audio >)
    }
    return res;
}
