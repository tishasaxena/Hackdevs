import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { appwriteService } from "../appwrite/configure";
import { useSelector } from "react-redux";

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const currentUser = useSelector((state) => state.Auth.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        if (!currentUser) return;
        const profile = await appwriteService.getCurrentUserProfile(currentUser.$id);
        setUserProfile(profile);
        reset(profile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setMessage("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser, reset]);

  // Update profile (excluding issuesReported)
  const onSubmit = async (data) => {
    setMessage("");
    try {
      await appwriteService.updateUser(currentUser.$id, {
        name: data.name,
        state: data.state,
        city: data.city,
      });
      setUserProfile((prev) => ({ ...prev, ...data }));
      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("Failed to update profile. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#3D52A0] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 text-lg font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-700 text-lg font-medium">No profile found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#3D52A0]">
          User Profile
        </h2>

        {message && (
          <div
            className={`text-center mb-4 p-2 rounded-md ${
              message.includes("success")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* User ID */}
          <ProfileField label="User ID" value={userProfile.$id} />

          {/* Name */}
          <ProfileField
            label="Name"
            isEditing={isEditing}
            register={register("name")}
            value={userProfile.name}
          />

          {/* Email */}
          <ProfileField label="Email" value={userProfile.email} />

          {/* Issues Reported (non-editable) */}
          <ProfileField
            label="Issues Reported"
            value={userProfile.issuesReported || 0}
          />

          {/* State */}
          <ProfileField
            label="State"
            isEditing={isEditing}
            register={register("state")}
            value={userProfile.state}
          />

          {/* City */}
          <ProfileField
            label="City"
            isEditing={isEditing}
            register={register("city")}
            value={userProfile.city}
          />

          {/* Buttons */}
          <div className="flex justify-end mt-6 space-x-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    reset(userProfile);
                    setMessage("");
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#3D52A0] text-white rounded-lg hover:bg-[#2f3e7b]"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  setMessage("");
                }}
                className="px-4 py-2 bg-[#3D52A0] text-white rounded-lg hover:bg-[#2f3e7b]"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function ProfileField({ label, value, isEditing, register }) {
  return (
    <div className="flex justify-between border-b border-gray-200 py-2 items-center">
      <span className="font-medium text-gray-700">{label}:</span>
      {isEditing && register ? (
        <input
          {...register}
          className="border border-gray-300 rounded px-2 py-1 text-gray-900 w-1/2 focus:outline-none focus:ring-1 focus:ring-[#3D52A0]"
        />
      ) : (
        <span className="text-gray-900">{value || "—"}</span>
      )}
    </div>
  );
}

export default Profile;
