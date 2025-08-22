import { useRef } from "react";
import { ProfileIcon } from "assets/Icons/ProfileIcon";
import { Input } from "components/ui/Input/Input";
import { GetMeResponseDto } from "generated/api-types";
import { useCustomMutation } from "hooks/useCustomMutation/useCustomMutation";
import { useCustomQuery } from "hooks/useCustomQuery/useCustomQuery";

const GET_ME_URL = "users/me";
const UPLOAD_AVATAR_URL = "file-upload/user-avatar";

export const MyProfile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data } = useCustomQuery<GetMeResponseDto>(GET_ME_URL, true, [
    "getMe",
  ]);

  const { mutateAsync } = useCustomMutation<{ success: boolean }, FormData>({
    route: UPLOAD_AVATAR_URL,
    method: "POST",
    key: ["getMe"],
  });

  if (!data) {
    return null;
  }

  const { avatarUrl, id } = data;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("userId", id);

    await mutateAsync(formData);
  };

  return (
    <div className="pt-4">
      <div className="flex flex-col gap-2 items-center">
        {avatarUrl ? (
          <img
            className="w-48 h-48 rounded-full"
            src={avatarUrl}
            alt="user avatar"
          />
        ) : (
          <ProfileIcon />
        )}

        <button
          className="text-jf-purple-400"
          onClick={() => fileInputRef.current?.click()}
        >
          Click here to add avatar
        </button>

        <div className="hidden">
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            value=""
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
};
