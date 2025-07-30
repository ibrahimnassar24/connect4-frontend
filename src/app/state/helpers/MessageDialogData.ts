
export interface MessageDialogData {
    title: string;
    content: string;
    action: () => void | null;
}