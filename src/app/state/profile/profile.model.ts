
interface Profile {
    firstName: string | null;
    lastName: string | null;
    email: string | null; // Email is required for identification
    avatarUrl: string | null;
    createdAt: Date | null; // Date when the profile was created
    updatedAt: Date | null; 
    bio: string | null;
    // socialLinks?: { [key: string]: string }; // Optional field for social media links
};

export default Profile;