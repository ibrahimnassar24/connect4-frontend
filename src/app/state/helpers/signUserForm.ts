interface SignUserForm {
  email: string;
    password: string;
    twoFactorCode?: string;
    twoFactorRecoveryCode?: string;
}

export default SignUserForm;