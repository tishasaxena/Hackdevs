import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { appwriteService } from "../appwrite/configure";
import { useSelector } from "react-redux";
import { Role } from "appwrite";

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [role,setRole]=useState("");

  const currentUser = useSelector((state) => state.Auth.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        if (!currentUser) return;
        const profile = await appwriteService.getCurrentUserProfile(
          currentUser.$id
        );
        setUserProfile(profile);
        reset(profile);
        if(profile.role){
          setRole("Admin");
        }
        else{
          setRole("Citizen");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setMessage("⚠️ Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [currentUser, reset]);

  const onSubmit = async (data) => {
    setMessage("");
    try {
      await appwriteService.updateUser(currentUser.$id, {
        name: data.name,
        state: data.state,
        city: data.city,
      });
      setUserProfile((prev) => ({ ...prev, ...data }));
      setMessage("✅ Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("❌ Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#3D52A0] to-[#7091E6]">
        <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#3D52A0] to-[#7091E6] text-white">
        <p className="text-lg font-medium">No profile found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3D52A0] via-[#5C6BC0] to-[#7091E6] flex items-center justify-center py-5 px-4">
      <div className="relative w-full max-w-3xl">
        {/* Glass Card */}
        <div className="backdrop-blur-md bg-white/20 shadow-2xl rounded-2xl overflow-hidden pt-10 pb-10 px-8 text-white">

          {/* Heading */}
          <h1 className="text-center text-3xl font-bold mb-4 tracking-wide">
            {userProfile.name || "User"}
          </h1>
          <p className="text-center text-sm opacity-50 mb-4">
            Manage your personal info
          </p>

          {/* Status Message */}
          {message && (
            <div
              className={`text-center mb-4 px-4 py-2 rounded-lg ${message.includes("success")
                ? "bg-green-500/30 border border-green-400"
                : "bg-red-500/30 border border-red-400"
                }`}
            >
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileField label="User ID" value={userProfile.$id} />
              <ProfileField
                label="Name"
                isEditing={isEditing}
                register={register("name")}
                value={userProfile.name}
              />
              <ProfileField label="Email" value={userProfile.email} />
              <ProfileField
                label="Issues Reported"
                value={userProfile.issuesReported || 0}
              />
              <ProfileField
                label="State"
                isEditing={isEditing}
                register={register("state")}
                value={userProfile.state}
              />
              <ProfileField
                label="City"
                isEditing={isEditing}
                register={register("city")}
                value={userProfile.city}
              />
              <ProfileField
                label="Role"
                register={register("role")}
                value={role}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4 pt-6">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      reset(userProfile);
                      setMessage("");
                    }}
                    className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 rounded-full bg-white text-[#3D52A0] font-semibold hover:bg-gray-200 transition disabled:opacity-60"
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
                  className="px-6 py-2 rounded-full bg-white text-[#3D52A0] font-semibold hover:bg-gray-200 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value, isEditing, register }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 opacity-90">{label}</label>
      {isEditing && register ? (
        <input
          {...register}
          className="w-full px-3 py-2 rounded-lg border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200"
        />
      ) : (
        <div className="px-3 py-2 rounded-lg bg-white/10 border border-white/20">
          {value || "—"}
        </div>
      )}
    </div>
  );
}

export default Profile;
