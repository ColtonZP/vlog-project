import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

import { key } from '../../firebase'
import { GET_PLAYLIST } from '../../GraphQL/queries'
import arrow from '../../images/arrow.svg'

type Props = {
    title: string
    playListId: string
}

export const Playlist = ({ title, playListId }: Props) => {
    const { loading, data } = useQuery(GET_PLAYLIST, {
        variables: {
            playlistId: playListId,
            key: key,
        },
    })

    console.log({ playlist: data, playlistLoading: loading })

    if (loading) return <p>loading playlist...</p>

    return (
        <>
            {data.getPlaylist.items.length >= 1 && (
                <div className="playlist">
                    <div className="title">
                        <h2>{title}</h2>
                        {data.getPlaylist.items.length === 9 && (
                            <Link to={`/playlist/${playListId}`}>
                                <span>More videos</span>
                                <img src={arrow} alt="" />
                            </Link>
                        )}
                    </div>

                    <div className="videos">
                        {data.getPlaylist.items.map(
                            (video: any, index: number) =>
                                index < 8 && (
                                    <Link
                                        to={`/${video.snippet.resourceId.videoId}`}
                                        key={video.id}
                                        className="video-link"
                                    >
                                        <img src={video.snippet.thumbnails.maxres.url} alt="" />
                                        <h4>{video.snippet.title}</h4>
                                    </Link>
                                ),
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
