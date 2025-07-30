export interface Invitation {
    invitationId: string;
    senderEmail: string;
    receiverId: string;
    expiresAt: Date;
}