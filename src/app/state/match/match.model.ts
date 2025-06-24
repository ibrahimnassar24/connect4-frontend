import Movement from "../helpers/movement";

interface Match {
    id: string; // Unique identifier for the match
    player1Id: string; // ID of the first player
    player2Id: string; // ID of the second player
    winnerId?: string; // ID of the winning player, if any
    status: 'PENDING' | 'ONGOING' | 'FINISHED'; // Current status of the match
    createdAt: Date; // Date when the match was created
    updatedAt: Date; // Date when the match was last updated
    moves?: Movement[]; // List of moves made in the match
};

export default Match;