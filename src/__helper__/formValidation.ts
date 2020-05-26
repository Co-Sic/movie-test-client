import React from "react";

export function handleFormFieldError(setInputs: (val: any) => void ,name: string, value: string, message: string): boolean {
    setInputs((inputs: any) => ({...inputs, [name + "Error"]: ""}));
    if (value === "") {
        setInputs((inputs: any) => ({...inputs, [name + "Error"]: message}));
        return true;
    }
    return false;
}

export function handleChange(e: React.ChangeEvent<any>, setInputs: (val: any) => void) {
    const {name, value} = e.target;
    setInputs((inputs: any) => ({...inputs, [name]: value}));
}
