
export const clearAllErrors = (setErrorsFunction) => {
    setErrorsFunction({
        linkedin: "",
        github: "",
        phone: "",
        email: "",
        start: "",
        end: "",
        completionYear: "",
        percentage: "",
        common: ""
    });
};
