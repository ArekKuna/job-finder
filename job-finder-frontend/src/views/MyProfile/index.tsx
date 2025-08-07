import { useRef } from "react";
import { AvatarPlaceholderIcon } from "assets/Icons/AvatarPlaceholderIcon";
import { Input } from "components/UI/Input/Input";
import { GetMeResponseDto } from "generated/api-types";
import { useCustomMutation } from "hooks/useCustomMutation/useCustomMutation";
import { useCustomQuery } from "hooks/useCustomQuery/useCustomQuery";

export const MyProfile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getMeRoute = "http://192.168.1.32:3000/users/me";
  const uploadAvatarRoute = "http://192.168.1.32:3000/file-upload/user-avatar";

  const { data } = useCustomQuery<GetMeResponseDto>(getMeRoute, true, [
    "getMe",
  ]);

  const { mutateAsync } = useCustomMutation<{ success: boolean }, FormData>({
    url: uploadAvatarRoute,
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
          <img className="w-16 h-16 rounded-full" src={avatarUrl} alt="" />
        ) : (
          <AvatarPlaceholderIcon />
        )}

        <button onClick={() => fileInputRef.current?.click()}>
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
