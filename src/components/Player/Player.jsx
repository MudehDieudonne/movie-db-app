import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Player.css';
import { IoCloseCircleOutline, IoPause, IoPlay, IoSettingsOutline, IoRefresh, IoChevronDown } from 'react-icons/io5';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const Player = ({ movieId, type = 'movie', onClose }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [source, setSource] = useState('Source 2');
    const [reloadKey, setReloadKey] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Series state
    const [seasons, setSeasons] = useState([]);
    const [currentSeason, setCurrentSeason] = useState(1);
    const [currentEpisode, setCurrentEpisode] = useState(1);
    const [episodesCount, setEpisodesCount] = useState(0);
    const [showSeasonDropdown, setShowSeasonDropdown] = useState(false);
    const [showEpisodeDropdown, setShowEpisodeDropdown] = useState(false);

    useEffect(() => {
        if (type === 'tv') {
            const fetchTVDetails = async () => {
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/tv/${movieId}?api_key=${apiKey}`);
                    setSeasons(response.data.seasons.filter(s => s.season_number > 0)); // Remove Specials
                    const s1 = response.data.seasons.find(s => s.season_number === 1);
                    setEpisodesCount(s1 ? s1.episode_count : 0);
                } catch (err) {
                    console.error("Failed to fetch TV details:", err);
                }
            };
            fetchTVDetails();
        }
    }, [movieId, type]);

    const handleSeasonChange = async (sNum, eCount) => {
        setCurrentSeason(sNum);
        setEpisodesCount(eCount);
        setCurrentEpisode(1);
        setShowSeasonDropdown(false);
        setReloadKey(prev => prev + 1);
    };

    const sources = {
        'Source 1': type === 'movie' ? `https://vidsrc.pro/embed/movie/${movieId}` : `https://vidsrc.pro/embed/tv/${movieId}/${currentSeason}/${currentEpisode}`,
        'Source 2': type === 'movie' ? `https://vidsrc.cc/v2/embed/movie/${movieId}` : `https://vidsrc.cc/v2/embed/tv/${movieId}/${currentSeason}/${currentEpisode}`,
        'Source 3': type === 'movie' ? `https://vidsrc.me/embed/movie?tmdb=${movieId}` : `https://vidsrc.me/embed/tv?tmdb=${movieId}&s=${currentSeason}&e=${currentEpisode}`,
        'Source 4': type === 'movie' ? `https://vidsrc.xyz/embed/movie?tmdb=${movieId}` : `https://vidsrc.xyz/embed/tv?tmdb=${movieId}&s=${currentSeason}&e=${currentEpisode}`
    };

    const handleReload = () => {
        setReloadKey(prev => prev + 1);
        setIsPlaying(true);
    };

    return (
        <div className="player-overlay" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="player-container">
                <div className="player-header">
                    <div className="player-controls-left">
                        <button className="player-btn" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <IoPause /> : <IoPlay />}
                        </button>

                        {type === 'tv' && (
                            <div className="series-selectors">
                                <div className="series-dropdown-container">
                                    <button className="player-btn" onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}>
                                        S{currentSeason} <IoChevronDown />
                                    </button>
                                    {showSeasonDropdown && (
                                        <div className="series-dropdown">
                                            {seasons.map(s => (
                                                <div key={s.id} className="dropdown-item" onClick={() => handleSeasonChange(s.season_number, s.episode_count)}>
                                                    Season {s.season_number}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="series-dropdown-container">
                                    <button className="player-btn" onClick={() => setShowEpisodeDropdown(!showEpisodeDropdown)}>
                                        E{currentEpisode} <IoChevronDown />
                                    </button>
                                    {showEpisodeDropdown && (
                                        <div className="series-dropdown">
                                            {[...Array(episodesCount)].map((_, i) => (
                                                <div key={i} className="dropdown-item" onClick={() => { setCurrentEpisode(i + 1); setShowEpisodeDropdown(false); setReloadKey(prev => prev + 1); }}>
                                                    Episode {i + 1}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="source-selector">
                            <button className="player-btn" onClick={() => setShowSettings(!showSettings)}>
                                <IoSettingsOutline /> <span>{source}</span>
                            </button>
                            {showSettings && (
                                <div className="source-dropdown">
                                    {Object.keys(sources).map(s => (
                                        <div
                                            key={s}
                                            className={`source-item ${source === s ? 'active' : ''}`}
                                            onClick={() => {
                                                setSource(s);
                                                setShowSettings(false);
                                                setReloadKey(prev => prev + 1);
                                            }}
                                        >
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button className="player-btn reload-btn" onClick={handleReload} title="Reload Player">
                            <IoRefresh /> <span>Reload</span>
                        </button>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <IoCloseCircleOutline />
                    </button>
                </div>

                <div className="iframe-wrapper">
                    {isPlaying ? (
                        <iframe
                            key={reloadKey}
                            src={sources[source]}
                            style={{ width: '100%', height: '100%' }}
                            frameBorder="0"
                            scrolling="no"
                            allowFullScreen
                            title="Movie Player"
                        ></iframe>
                    ) : (
                        <div className="player-paused">
                            <IoPlay onClick={() => setIsPlaying(true)} />
                            <p>Paused</p>
                        </div>
                    )}
                </div>
            </div>
            <div className={`player-hint ${isHovered ? 'visible' : ''}`}>
                <p>TIP: If a source doesn&apos;t work, try switching to another Source from the settings menu.</p>
            </div>
        </div>
    );
};

Player.propTypes = {
    movieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default Player;
