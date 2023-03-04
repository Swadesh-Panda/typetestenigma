import { PlayerContext } from "context/PlayerContext";
import { resetTest } from "helpers/resetTest";
import { useSelector } from "react-redux";
import { State } from "store/reducer";
import { useContext, useState, useEffect } from 'react'
import "stylesheets/Result.scss";

export default function Result() {
    const {
        word: { wordList, typedHistory, currWord },
        preferences: { timeLimit },
    } = useSelector((state: State) => state);
    const spaces = wordList.indexOf(currWord);
    let correctChars = 0;
    const result = typedHistory.map(
        (typedWord, idx) => typedWord === wordList[idx]
    );
    result.forEach((r, idx) => {
        if (r) correctChars += wordList[idx].length;
    });
    const wpm = ((correctChars + spaces) * 60) / timeLimit / 5;
    const score = Math.round(wpm) + result.filter((x) => x).length - result.filter((x) => !x).length

    const { player, setPlayer } = useContext(PlayerContext)

    useEffect(() => {
        if (score >= 0)
            localStorage.setItem(`score_${player.number}`, `${score}`)
    }, [])


    const handleClick = () => {
        setPlayer({ number: player.number + 1, score: 0 })
        localStorage.setItem('player_number', `${player.number + 1}`)
        resetTest()
    }

    return (
        <div className="result">
            <table>
                <tbody>
                    <tr>
                        <th>Words Per Minute:</th>
                        <td>+ {Math.round(wpm)}</td>
                    </tr>
                    <tr>
                        <th>Correct Words:</th>
                        <td>+ {result.filter((x) => x).length}</td>
                    </tr>
                    <tr>
                        <th>Incorrect Words:</th>
                        <td>- {result.filter((x) => !x).length}</td>
                    </tr>

                    <tr>
                        <td colSpan={2} align="center">
                            <h1>Player Score = {localStorage.getItem(`score_${player.number}`)}</h1>
                        </td>
                    </tr>
                    {player.number !== 3 &&
                        <>
                            <tr>
                                <td colSpan={2} align="center">
                                    <button onClick={handleClick}>Next Player</button>
                                </td>
                            </tr>
                        </>}

                    {
                        player.number === 3 &&
                        <>
                            <tr className="wrong">
                                <th>player 3:</th>
                                <td>
                                    {localStorage.getItem(`score_3`)}
                                </td>
                            </tr>
                            <tr className="wrong">
                                <th>player 2:</th>
                                <td>
                                    {localStorage.getItem(`score_2`)}
                                </td>
                            </tr>
                            <tr className="wrong">
                                <th>player 1:</th>
                                <td>
                                    {localStorage.getItem(`score_1`)}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="wrong" align="center">
                                    <h1>Total Score = {
                                        parseInt(localStorage.getItem("score_1") || "0") +
                                        parseInt(localStorage.getItem("score_2") || "0") +
                                        parseInt(localStorage.getItem("score_3") || "0")
                                    }</h1>
                                </td>
                            </tr>
                        </>
                    }
                </tbody>
            </table>
        </div>
    );
}
