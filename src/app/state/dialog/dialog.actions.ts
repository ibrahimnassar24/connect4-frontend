import { createAction, props } from "@ngrx/store";

export const openEditProfileDialog = createAction(
    "[Dialog] Open Edit Profile Dialog"
);

export const openCreateProfileDialog = createAction(
    "[Dialog] Open Create Profile Dialog"
);

export const openChooseAvatarDialog = createAction(
    "[Dialog] Open Choose Avatar Dialog"
);

export const openChooseCoverDialog = createAction(
    "[Dialog] Open Choose Cover Dialog"
);

export const openCongratulationsDialog = createAction(
    "[Dialog] Open Congratulations Dialog"
);

export const openAuthenticationErrorDialog = createAction(
    "[Dialog] Open Authentication Error Dialog"
);

export const openMatchWonDialog = createAction(
    "[Dialog] Open Match Won Dialog"
);;

export const openMatchLostDialog = createAction(
    "[Dialog] Open Match Lost Dialog"
);

export const openMatchForfittedDialog = createAction(
    "[Dialog] Open Match Forfitted Dialog"
);