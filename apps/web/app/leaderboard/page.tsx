"use client"

import React, { useEffect, useState } from "react";
import BackHomeButton from "../components/backHomeButton/backHomeButton";

export default function leaderboard() {
    type returnMyData = {
        rank: string,
        playerName: string,
        score: string,
        final: boolean,
    }

    type Players = {
        [key: string]: number;
    };

    const divRowStyle = {
        fontSize: "20px", 
        fontWeight: "bold", 
        padding: "12px 10px 12px 10px",
    };

    const divHeaderStyle = { 
        display: "flex", 
        width: "60%", 
        gap: "10px", 
        backgroundColor: "#252525", 
        color: "#FFEDDF", 
        borderRadius: "36px", 
        borderBottom: "5px solid #4a4646",
    }

    const divGlobalDataStyle = { 
        display: "flex", 
        width: "60%", 
        gap: "10px", 
        backgroundColor: "#EE964B", 
        color: "black", 
        borderRadius: "36px",
        marginTop: "20px",
    }

    const divPlayerDataStyle = { 
        display: "flex", 
        width: "60%", 
        gap: "10px", 
        backgroundColor: "#C5D86D", 
        color: "black", 
        borderRadius: "36px",
        marginTop: "20px",
    }

    const rankColumnStyle = {
        flex: 3,
        textAlign: "center",
    }

    const nameAndScoreColumnStyle = {
        flex: 4,
        textAlign: "left",
    }
 
    // Mock Data
    const myData:Players = {
        "Player-2": 30,
    }

    // Mock Data
    const players:Players = {
        "Player-1": 10,
        "Player-2": 30,
        "Player-3": 20,
        "Player-4": 100,
        "Player-5": 35,
        "Player-6": 25,
        "Player-7": 15,
        "Player-8": 35,
        "Player-9": 25,
        "Player-10": 10,
        "Player-11": 60,
        "Player-12": 5,
    };

    const [sortedPlayers, setSortedPlayers] = useState<Players>({});
    const [currentPlayerOnTop, setcurrentPlayerOnTop] = useState<Boolean>(false);
    const [playerKey, setplayerKey] = useState<string>("None...");

    // Will change once fetch data function is completed
    useEffect(() => {
        const sorted = Object.fromEntries(
            Object.entries(players).sort(([, a], [, b]) => b - a)
        );
        setSortedPlayers(sorted);
    }, []);

    // Wait for schema
    const fetchAllPlayers = () => {

    }

    // Wait for schema
    const fetchThisPlayer = () => {

    }

    const getTopTenPlayers = () => {
        const arrayTopTen = Object.entries(sortedPlayers).slice(0, 10);
        return Object.fromEntries(arrayTopTen);
    }

    const getMyData = (): returnMyData => {
        const keys:string[] = Object.keys(myData);
        const name:string = keys[0]!;
        const score:number = myData[name]!;
        const allPlayers = Object.entries(sortedPlayers);
        const myPlayer: [string, number] = [name, score];
        const myRank = allPlayers.findIndex(([playerName, playerScore]) => playerName === myPlayer[0] && playerScore === myPlayer[1]) + 1;

        return {
            rank: `# ${myRank}`,
            playerName: name,
            score: String(score),
            final: true,
        };
    }
    
    const populateTableByRow = ({ rank, playerName, score, final=false }: returnMyData) => {
        if (!currentPlayerOnTop) {
            if (playerName === Object.keys(myData)![0] && !final) {
                setcurrentPlayerOnTop(true);
                setplayerKey(playerName);
            }
        }

        return (<>
            <div style={rankColumnStyle}>
                <p style={divRowStyle}>{rank}</p>
            </div>
            <div style={nameAndScoreColumnStyle}>
                <p style={divRowStyle}>{playerName}</p>
            </div>
            <div style={nameAndScoreColumnStyle}>
                <p style={divRowStyle}>{score}</p>
            </div>
        </>);
    }

    return (<>
    <div className = "flex items-center justify-center flex-grow min-h-screen" style={{ backgroundColor: "#0D1321" }}>
        <div className="container mx-auto py-5" style={{ marginBottom: "96px" }}>
            <BackHomeButton/>
            <p className='text-center text-6xl mt-12 mb-14 font-bold' style={{ color: "#FFEDDF" }}>Leaderboard</p>
            <div className="flex flex-col items-center w-full overflow-visible">
                <div style={divHeaderStyle}>
                    {populateTableByRow({
                        rank: "Rank", 
                        playerName: "Name", 
                        score: "Score",
                        final: false,
                    })}
                </div>
                {Object.keys(getTopTenPlayers()).map((player, index) => {
                    return (
                        <div style={player == playerKey ? divPlayerDataStyle : divGlobalDataStyle}>
                            {populateTableByRow({
                                rank: `# ${ index + 1 }`, 
                                playerName: player, 
                                score: String(players[player]),
                                final: false,
                            })}
                        </div>
                    );
                })}
                {!currentPlayerOnTop && (
                    <div style={divPlayerDataStyle}>
                        {populateTableByRow(getMyData())}
                    </div>
                )}
            </div>
        </div>
    </div>
    </>);
}
