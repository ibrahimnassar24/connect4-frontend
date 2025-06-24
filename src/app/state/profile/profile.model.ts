
interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string; // Optional field for avatar URL
    createdAt: Date; // Date when the profile was created
    updatedAt: Date; // Date when the profile was last updated
    bio?: string; // Optional field for a short biography
    socialLinks?: { [key: string]: string }; // Optional field for social media links
};

export default Profile;