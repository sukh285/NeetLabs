import React from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

const CreatePlaylistModal = ({ isOpen, onClose, onSubmit, isAdmin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 font-inter bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-neet-neutral rounded-3xl shadow-2xl border border-neet-base-100/10 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-neet-base-100/10 bg-neet-neutral/90">
          <h3 className="text-lg sm:text-xl font-limelight font-bold text-neet-base-100">
            Create New Playlist
          </h3>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-circle hover:bg-neet-primary/10 transition"
          >
            <X className="w-5 h-5 text-neet-base-100" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-5"
        >
          {/* Playlist Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-neet-accent/80">
                Playlist Name
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g. Dynamic Programming Mastery"
              className="input input-bordered w-full bg-neet-neutral/20 border-neet-base-100/10 text-neet-base-100 focus:border-neet-primary focus:outline-none transition"
              {...register("name", { required: "Playlist name is required" })}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-neet-error text-sm">
                  {errors.name.message}
                </span>
              </label>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-neet-accent/80">
                Description
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered bg-neet-neutral/20 border-neet-base-100/10 text-neet-base-100 focus:border-neet-primary focus:outline-none transition h-24 resize-none"
              placeholder="Brief description of this playlist"
              {...register("description")}
            />
          </div>

          {/* Access Level - only for admins */}
          {isAdmin && (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-neet-accent/80">
                  Access Level
                </span>
              </label>
              <select
                className="select select-bordered w-full bg-neet-primary/20 border-neet-base-100/10 text-neet-accent focus:border-neet-primary focus:outline-none transition"
                {...register("accessLevel", { required: "Access level is required" })}
                defaultValue="FREE"
              >
                <option value="FREE" className="text-neet-neutral">Free</option>
                <option value="PRO" className="text-neet-neutral">Pro</option>
                <option value="ADVANCED" className="text-neet-neutral">Advanced</option>
                <option value="CUSTOM" className="text-neet-neutral">Custom (User Playlist)</option>
              </select>
              {errors.accessLevel && (
                <label className="label">
                  <span className="label-text-alt text-neet-error text-sm">
                    {errors.accessLevel.message}
                  </span>
                </label>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn rounded-full px-5 py-2 font-medium text-neet-accent hover:text-neet-primary hover:bg-neet-primary/10 border border-neet-base-100/20 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="relative group btn rounded-full px-6 py-2.5 font-semibold shadow-lg bg-gradient-to-r from-neet-primary to-neet-secondary text-neet-primary-content border-none hover:scale-100 active:scale-95 transition-all duration-200"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neet-secondary to-neet-accent opacity-40 blur rounded-full group-hover:opacity-50 transition duration-200 -z-10" />
              <span className="relative">Create Playlist</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
