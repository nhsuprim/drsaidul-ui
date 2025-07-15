// "use server";
// import { FieldValues } from "react-hook-form";

// interface LoginResponse {
//     data: {
//         accessToken: string;
//     };
//     message: string;
// }

// export const userLogin = async (data: FieldValues): Promise<LoginResponse> => {
//     const URL = process.env.NEXT_PUBLIC_API_URL;

//     const res = await fetch(`${URL}/auth/login`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     });

//     const result = await res.json();

//     return result;
// };
