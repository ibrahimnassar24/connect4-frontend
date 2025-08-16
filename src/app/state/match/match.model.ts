import Movement from "../helpers/movement";
import { Invitation } from "../helpers/Invitation";

export interface Match {
    id: string | null;
    firstPlayer?: string | null;
    secondPlayer?: string | null;
    winner: string | null;
    invitationId: string | null;
    status?: 'PENDING' | 'ONGOING' | 'FINISHED'; // Current status of the match
    createdAt?: Date | null;
    updatedAt?: Date | null;
    grid?: (Movement | null)[][];
    turn?: string;
};