import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "components/Header";
import Test from "components/Test";
import Result from "components/Result";
import Footer from "components/Footer";
import { State } from "store/reducer";
import { setTimerId } from "store/actions";
import { recordTest } from "helpers/recordTest";
import "stylesheets/themes.scss";
import CommandPallet from "components/CommandPallet";
import { PlayerContext } from "context/PlayerContext";
import LockScreen from "components/LockScreen";

export default function App() {
    const {
        time: { timerId, timer },
        word: { currWord, typedWord, activeWordRef },
    } = useSelector((state: State) => state);
    const dispatch = useDispatch();
    const [showPallet, setShowPallet] = useState(false);
    const [showTest, setShowTest] = useState(true)
    const [showLockScreen, setShowLockScreen] = useState(true)

    // Context
    const { player, setPlayer } = useContext(PlayerContext)

    useEffect(() => {
        setPlayer({
            number: parseInt(localStorage.getItem("player_number") || "1"),
            score: parseInt(localStorage.getItem(`score_${parseInt(localStorage.getItem("player_number") || "1")}`) || "0")
        })
    }, [])

    useEffect(() => {
        if (player.score) setShowTest(false)
        else setShowTest(true)

        if (!localStorage.getItem('player_number')) localStorage.setItem('player_number', '1')
    }, [player])

    useEffect(() => {
        if (!showLockScreen || localStorage.getItem('token')) {

            document.onkeydown = (e) => {
                if (e.ctrlKey && e.key === "k") {
                    setShowPallet((s) => !s);
                    e.preventDefault();
                } else if (
                    e.key.length === 1 ||
                    e.key === "Backspace" ||
                    e.key === "Tab"
                ) {
                    recordTest(e.key, e.ctrlKey);
                    e.preventDefault();
                }
            };
            return () => {
                document.onkeydown = null;
            };
        }
    }, [dispatch, showLockScreen]);

    useEffect(() => {
        let idx = typedWord.length - 1;
        const currWordEl = activeWordRef?.current!;
        if (currWordEl) {
            currWordEl.children[idx + 1].classList.add(
                currWord[idx] !== typedWord[idx] ? "wrong" : "right"
            );
        }
    }, [currWord, typedWord, activeWordRef]);

    useEffect(() => {
        let idx = typedWord.length;
        const currWordEl = activeWordRef?.current!;
        if (currWordEl && idx < currWord.length)
            currWordEl.children[idx + 1].classList.remove("wrong", "right");
    }, [currWord.length, typedWord, activeWordRef]);

    useEffect(() => {
        if (!timer && timerId) {
            clearInterval(timerId);
            dispatch(setTimerId(null));
        }
    }, [dispatch, timer, timerId]);

    return (
        <>
            {
                !localStorage.getItem('token') && showLockScreen ? <LockScreen setLock={setShowLockScreen} /> :
                    <>
                        <Header />
                        {/* {showPallet && <CommandPallet setShowPallet={setShowPallet} />} */}
                        {showTest && timer ? <Test /> : <Result />}
                        <Footer />
                    </>

            }
        </>
    );
}
