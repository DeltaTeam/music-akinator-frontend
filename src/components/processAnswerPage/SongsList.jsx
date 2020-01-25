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
        res.push(<p key={i} className='standartTextBlock greyColor'>{songs[i].artist} &mdash; {songs[i].title}</p>)
        if (songs[i].song !== null) {
            if (songs[i].song.substr(songs[i].song.length - 4) === '.mp3') {
                res.push(
                    <audio key={i + 5} controls>
                        <source src={songs[i].song} key={i + 10}></source>
                    </audio >)
            }
            else {
                res.push(
                    <a key={i + 15} href={songs[i].song} className='standartTextBlock greyColor'>Source</a>
                )
            }
        }
    }
    return res;
}
