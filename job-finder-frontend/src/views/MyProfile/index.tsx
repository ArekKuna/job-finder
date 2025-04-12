import { GetMeResponseDto } from "generated/api-types";
import { useCustomQuery } from "hooks/useCustomQuery/useCustomQuery";

export const MyProfile = () => {
  const url = "http://192.168.1.32:3000/users/me";

  const { data } = useCustomQuery<GetMeResponseDto>(url, true, ["getMe"]);

  console.log(data);
  return (
    <div>
      <div>{data?.email}</div>
    </div>
  );
};
