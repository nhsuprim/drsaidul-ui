"use server";

export const PatientRegester = async (formdata: FormData) => {
    const URL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${URL}/user/create-patient`, {
        method: "POST",
        body: formdata,
        cache: "no-store",
    });

    const patientInfo = await res.json();
    return patientInfo;
};
