
interface Movement {
    playerId: string; // ID of the player making the move
    column: number; // Column where the move is made
    timestamp: Date; // Timestamp of when the move was made
};

export default Movement;