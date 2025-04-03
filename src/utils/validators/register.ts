import { z } from "zod";

const userIdRegex = /^[a-zA-Z0-9]{6,20}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerSchema = z
  .object({
    user_id: z
      .string()
      .min(6, { message: "아이디는 6글자 이상이어야 합니다." })
      .max(20, { message: "아이디는 20글자 이하이어야 합니다." })
      .refine(value => userIdRegex.test(value), "아이디는 6-20자리로 영문+숫자로 입력해야 합니다."),
    user_nickname: z
      .string()
      .min(3, { message: "닉네임은 3글자 이상이어야 합니다.." })
      .max(12, { message: "닉네임은 12글자 이하이어야 합니다." }),
    user_server: z.string().min(2, { message: "서버를 선택해주세요." }),
    user_race: z.string().min(2, { message: "종족을 선택해주세요." }),
    user_password: z
      .string()
      .min(8, "비밀번호는 최소 8자리 이상이어야 합니다.")
      .max(20, "비밀번호는 20자리 이하이어야 합니다.")
      .refine(
        value => passwordRegex.test(value),
        "비밀번호는 최소 8자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다.",
      ),
    user_password_confirm: z
      .string()
      .min(8, "비밀번호는 최소 8자리 이상이어야 합니다.")
      .max(20, "비밀번호는 20자리 이하이어야 합니다.")
      .refine(
        value => passwordRegex.test(value),
        "비밀번호는 최소 8자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다.",
      ),
  })
  .refine(data => data.user_password === data.user_password_confirm, {
    path: ["user_password_confirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });
