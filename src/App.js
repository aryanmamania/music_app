import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: "Chasing",
    songArtist: "NEFFEX",
    songSrc: "./Assets/songs/Chasing - NEFFEX.mp3",
    songAvatar: "./Assets/Images/thesearch.jpeg",
  });

  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState("04 : 38");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00 : 00");

  const currentAudio = useRef();

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime =
      (e.target.value * currentAudio.current.duration) / 100;
  };

  let avatarClass = ["objectFitCover", "objectFitContain", "none"];
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);
  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0);
    } else {
      setAvatarClassIndex(avatarClassIndex + 1);
    }
  };

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const musicAPI = [
    {
      songName: "AURORA - Runaway",
      songArtist: "Aurora Aksnes",
      songSrc: "./Assets/songs/AURORA - Runaway (Lyrics).mp3",
      songAvatar: "./Assets/Images/image2.jpeg",
    },
    {
      songName: "StarBoy",
      songArtist: "The Weekend",
      songSrc: "./Assets/songs/The20WeekndDaft20Punk20-20Starboy20.mp3",
      songAvatar: "./Assets/Images/starboy.jpeg",
    },
    {
      songName: "Pyar Hota Kayi Baar",
      songArtist: "Arijit Singh",
      songSrc:
        "./Assets/songs/Pyaar Hota Kayi Baar Hai - Tu Jhoothi Main Makkar 128 Kbps.mp3",
      songAvatar: "./Assets/Images/download.jpeg",
    },
    {
      songName: "Baby",
      songArtist: "Justin Beiber",
      songSrc: "./Assets/songs/Baby_320(PagalWorld).mp3",
      songAvatar: "./Assets/Images/jb.jpeg",
    },
    {
      songName: "Hate Me",
      songArtist: "Juice World",
      songSrc:
        "./Assets/songs/Ellie_Goulding_-_Hate_Me_ft_Juice_WRLD_-_Hitxclusive.co.mp3",
      songAvatar: "./Assets/Images/juice_world.jpeg",
    },
    {
      songName: "The Slim Shaddy",
      songArtist: "Eminem",
      songSrc: "./Assets/songs/Eminem-The-Real-Slim-Shady-(BeatzJam.com).mp3",
      songAvatar: "./Assets/Images/eminem.jpeg",
    },
    {
      songName: "Shinunoga E-Wa",
      songArtist: "Fujii Kaze",
      songSrc: "./Assets/songs/Fujii_Kaze_-_Shinunoga_E-Wa.mp3",
      songAvatar: "./Assets/Images/Shinunoga-E-Wa.webp",
    },
    {
      songName: "Industry Baby",
      songArtist: "Lil Nas X",
      songSrc:
        "./Assets/songs/Lil_Nas_X_ft_Jack_Harlow_-_Industry_Baby_thinknews.com.ng.mp3",
      songAvatar: "./Assets/Images/industry_baby.jpeg",
    },
    {
      songName: "The search",
      songArtist: "NF",
      songSrc: "./Assets/songs/NF_-_The_Search_CeeNaija.com_.mp3",
      songAvatar: "./Assets/Images/thesearch.jpeg",
    },
    {
      songName: "Chasing",
      songArtist: "NEFFEX",
      songSrc: "./Assets/songs/Chasing - NEFFEX.mp3",
      songAvatar: "./Assets/Images/image1.jpeg",
    },
  ];

  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const handlePrevSong = () => {
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar,
    });
    setIsAudioPlaying(true);
  };

  const handleAudioUpdate = () => {
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
    setMusicTotalLength(musicTotalLength0);

    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${
      currentSec < 10 ? `0${currentSec}` : currentSec
    }`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt(
      (currentAudio.current.currentTime / currentAudio.current.duration) * 100
    );
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  return (
    <>
      <div className="container">
        <audio
          src="./Assets/songs/Chasing - NEFFEX.mp3"
          ref={currentAudio}
          onEnded={handleNextSong}
          onTimeUpdate={handleAudioUpdate}
        ></audio>
        <div className="blackScreen"></div>
        <div className="music-Container">
          <p className="musicPlayer">Music Player</p>
          <p className="music-Head-Name">{currentMusicDetails.songName}</p>
          <p className="music-Artist-Name">{currentMusicDetails.songArtist}</p>
          <img
            src={currentMusicDetails.songAvatar}
            className={avatarClass[avatarClassIndex]}
            onClick={handleAvatar}
            alt="song Avatar"
            id="songAvatar"
          />
          <div className="musicTimerDiv">
            <p className="musicCurrentTime">{musicCurrentTime}</p>
            <p className="musicTotalLenght">{musicTotalLength}</p>
          </div>
          <input
            type="range"
            name="musicProgressBar"
            className="musicProgressBar"
            value={audioProgress}
            onChange={handleMusicProgressBar}
          />
          <div className="musicControlers">
            <i
              className="fa-solid fa-backward musicControler"
              onClick={handlePrevSong}
            ></i>
            <i
              className={`fa-solid ${
                isAudioPlaying ? "fa-pause-circle" : "fa-circle-play"
              } playBtn`}
              onClick={handleAudioPlay}
            ></i>
            <i
              className="fa-solid fa-forward musicControler"
              onClick={handleNextSong}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
