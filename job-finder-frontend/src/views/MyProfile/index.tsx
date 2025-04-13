import { AvatarIcon } from "assets/Icons/AvatarIcon";
import { Input } from "components/UI/Input/Input";
import { GetMeResponseDto } from "generated/api-types";
import { useCustomQuery } from "hooks/useCustomQuery/useCustomQuery";
import { useRef, useState } from "react";

export const MyProfile = () => {
  const [avatarFile, setAvatarFile] = useState<File | undefined>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const url = "http://192.168.1.32:3000/users/me";

  const { data } = useCustomQuery<GetMeResponseDto>(url, true, ["getMe"]);

  if (!data) {
    return null;
  }

  const { avatarReferenceId } = data;

  return (
    <div className="pt-4">
      <div className="flex flex-col gap-2 items-center">
        {avatarReferenceId ? "avatar" : <AvatarIcon />}

        <button onClick={() => fileInputRef.current?.click()}>
          {avatarFile?.name || "Click here to add avatar"}
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
