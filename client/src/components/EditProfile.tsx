import React from "react";

export const EditModel: React.FC<{
    onClose: () => void;
    onSubmit: () => void;
    fullName: string;
    setFullName: (val: string) => void;
    userName: string;
    setUserName: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    bio: string;
    setBio: (val: string) => void;
    link: string;
    setLink: (val: string) => void;
    Cover_Image: string;
    setCoverImage: (val: string) => void;
}> = ({
    onClose,
    onSubmit,
    fullName,
    setFullName,
    userName,
    setUserName,
    email,
    setEmail,
    bio,
    setBio,
    link,
    setLink,
    Cover_Image,
    setCoverImage,
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white text-black p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl mb-4 font-semibold">Edit Profile</h2>

                <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="mb-2 p-2 w-full border rounded"
                />
                <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Username"
                    className="mb-2 p-2 w-full border rounded"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="mb-2 p-2 w-full border rounded"
                />
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Bio"
                    className="mb-2 p-2 w-full border rounded"
                />
                <input
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Link"
                    className="mb-2 p-2 w-full border rounded"
                />
                <input
                    value={Cover_Image}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="Cover Image URL"
                    className="mb-4 p-2 w-full border rounded"
                />

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                    
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        
                        Save
                        </button>
                       
                </div>
            </div>
        </div>
    );
};
