// export const ModifyPayload = (values: any) => {
//     const obj = { ...values };
//     const file = obj["file"];
//     delete obj["file"];
//     const data = JSON.stringify(obj);
//     const formData = new FormData();
//     formData.append("data", data);
//     formData.append("file", file as Blob);

//     return formData;
// };

// export const ModifyPayload2 = (data: any, files: any) => {
//     const formData = new FormData();

//     // Append player data
//     for (const key in data.player) {
//         formData.append(`player[${key}]`, data.player[key]);
//     }

//     formData.append("password", data.password);

//     // Append files
//     files.forEach((file: any, index: any) => {
//         formData.append(`files`, file); // You might want to prefix the file name or handle differently based on your API
//     });

//     // Append password

//     return formData;
// };
