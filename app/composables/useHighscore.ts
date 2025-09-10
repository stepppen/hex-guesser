export const useHighscore = () => { 
    const highScoreTracker:Ref<number> = useState('highScoreTracker', () => 0);
    return {highScoreTracker}
}