import React, { useEffect, useState } from "react";
import InputControl from "../inputs/InputControl";
import styles from "./Editor.module.css";
import { isNumber, isValidUrl, validateDateFormat, validateEmail, validatePhoneNumber, validateStartDateBeforeEndDate } from "../../util/Validate";
import { clearAllErrors } from "../../util/ErrorHandler";
import { COMMON_ERROR, EMAIL_ERROR, ENDDATE_ERROR, ENDDATE_NEEDS_GREATER_ERROR, INVALIDURL_FORMAT, MINIMUM_SKILLS, NOTNUMBER_ERROR, PHONE_ERROR, STARTDATE_ERROR, sections } from "../../util/Constants";

function Editor() {

    const [activeSectionKey, setActiveSectionKey] = useState(Object.keys(sections)[0]);
    const [profileData, setProfileData] = useState({
        name: "",
        linkedin: "",
        github: "",
        phone: "",
        email: "",
        address: ""
    })
    const [experienceData, setexperienceData] = useState({
        jobTitle: "",
        start: "",
        end: "",
        company: "",
        description: "",
    })
    const [projectData, setprojectData] = useState({
        projectName: "",
        techStack: "",
        description: "",
    })
    const [skillsData, setskillsData] = useState({})

    const [educationData, seteducationData] = useState({
        college: "",
        completionYear: "",
        percentage: "",
        courseName: ""
    })

    const [errorMessages, setErrorMessages] = useState({});


    // Helper function to handle submission
    const handleSubmission = () => {
        clearAllErrors(setErrorMessages);
        console.log("handling submissiom")
        switch (activeSectionKey) {
            case "basicInfo":
                if (!profileData.name.trim() || !profileData.address.trim() || !profileData.email.trim() || !profileData.phone.trim()) {
                    setErrorMessages((prev) => ({ ...prev, common: COMMON_ERROR }));
                    return;
                }
                if (!validateEmail(profileData.email)) {
                    setErrorMessages((prev) => ({ ...prev, email: EMAIL_ERROR }));
                    return
                }
                if (!validatePhoneNumber(profileData.phone)) {
                    setErrorMessages((prev) => ({ ...prev, phone: PHONE_ERROR }));
                    return
                }
                if (!isValidUrl(profileData.github)) {
                    setErrorMessages((prev) => ({ ...prev, github: INVALIDURL_FORMAT }));
                    return
                }

                if (!isValidUrl(profileData.linkedin)) {
                    setErrorMessages((prev) => ({ ...prev, linkedin: INVALIDURL_FORMAT }));
                    return
                }


                localStorage.setItem('profileData', JSON.stringify({ ...profileData }));
                break;
            case "workExp":

                if (!experienceData.jobTitle.trim() || !experienceData.company.trim() || !experienceData.startDate.trim() || !experienceData.endDate.trim() || !experienceData.description.trim()) {
                    setErrorMessages((prev) => ({ ...prev, common: COMMON_ERROR }));
                    return;
                }
                if (!validateDateFormat(experienceData.startDate)) {
                    setErrorMessages((prev) => ({ ...prev, startDate: STARTDATE_ERROR }));
                    return
                } if (!validateDateFormat(experienceData.endDate)) {
                    setErrorMessages((prev) => ({ ...prev, endDate: ENDDATE_ERROR }));
                    return
                }
                if (!validateStartDateBeforeEndDate(experienceData.startDate, experienceData.endDate)) {
                    setErrorMessages((prev) => ({ ...prev, endDate: ENDDATE_NEEDS_GREATER_ERROR }));
                    return
                }

                localStorage.setItem('experienceFormData', JSON.stringify([{ ...experienceData }]));

                break;
            case "project":
                if (!projectData.projectName.trim() || !projectData.techStack.trim() || !projectData.description.trim()) {
                    setErrorMessages((prev) => ({ ...prev, common: COMMON_ERROR }));
                    return;
                }

                localStorage.setItem('projectsFormData', JSON.stringify([{ ...projectData }]));
                break;
            case "education":
                if (!educationData.courseName.trim() || !educationData.college.trim() || !educationData.completionYear.trim() || !educationData.percentage.trim()) {
                    setErrorMessages((prev) => ({ ...prev, common: COMMON_ERROR }));
                    return;
                }
                if (!isNumber(educationData.percentage)) {
                    setErrorMessages((prev) => ({ ...prev, percentage: NOTNUMBER_ERROR }));
                    return
                }
                if (!isNumber(educationData.completionYear)) {
                    setErrorMessages((prev) => ({ ...prev, completionYear: NOTNUMBER_ERROR }));
                    return
                }
                localStorage.setItem('educationFormData', JSON.stringify([{ ...educationData }]));
                break;

            case "skills":
                if (Object.values(skillsData).filter(skill => skill.trim() !== '').length < 3) {
                    setErrorMessages((prev) => ({ ...prev, common: MINIMUM_SKILLS }));
                    return;
                }
                localStorage.setItem('skillsData', JSON.stringify([{ ...skillsData }]));
                break;

            default:
                console.log("breaking")
                break;
        }

    };

    useEffect(() => {

        clearAllErrors(setErrorMessages);

        const profileData = JSON.parse(localStorage.getItem("profileData")) || {};
        const EducationFormData = JSON.parse(localStorage.getItem('educationFormData')) || [];
        const SkillsFormData = JSON.parse(localStorage.getItem('skillsData')) || [];
        const ProjectsFormData = JSON.parse(localStorage.getItem('projectsFormData')) || [];
        const ExperienceFormData = JSON.parse(localStorage.getItem('experienceFormData')) || [];

        console.log(SkillsFormData)
        setProfileData({
            ...profileData,
        });
        seteducationData({ ...EducationFormData[0] });
        setexperienceData({
            ...ExperienceFormData[0],
        });
        setskillsData({
            ...SkillsFormData[0],
        });
        setprojectData({
            ...ProjectsFormData[0],
        })
    }, [activeSectionKey]);

    const workExpBody = (
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl
                    label="Title"
                    placeholder="Enter title eg. Frontend developer"
                    value={experienceData.jobTitle}
                    onChange={(event) =>
                        setexperienceData((prev) => ({ ...prev, jobTitle: event.target.value }))
                    }
                />
                <InputControl
                    label="Company Name"
                    placeholder="Enter company name eg. amazon"
                    value={experienceData.company}
                    onChange={(event) =>
                        setexperienceData((prev) => ({ ...prev, company: event.target.value }))
                    }
                />
            </div>

            <div className={styles.row}>
                <InputControl
                    label="Start Date"
                    type="date"
                    placeholder="Enter start date of work"
                    value={experienceData.startDate}
                    onChange={(event) =>
                        setexperienceData((prev) => ({ ...prev, startDate: event.target.value }))
                    }
                    errormsg={errorMessages.startDate}
                />
                <InputControl
                    label="End Date"
                    type="date"
                    placeholder="Enter end date of work"
                    value={experienceData.endDate}
                    onChange={(event) =>
                        setexperienceData((prev) => ({ ...prev, endDate: event.target.value }))
                    }
                    errormsg={errorMessages.endDate}
                />
            </div>

            <div className={styles.column}>
                <label>Enter work description</label>
                <InputControl
                    placeholder="Description"
                    value={experienceData.description}
                    onChange={(event) =>
                        setexperienceData((prev) => ({ ...prev, description: event.target.value }))
                    }

                />

            </div>
            <div style={{ color: 'red' }}>{errorMessages.common}</div>
        </div>
    );
    const projectBody = (
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl
                    label="Title"
                    value={projectData.projectName}
                    placeholder="Enter title eg. Chat app"
                    onChange={(event) =>
                        setprojectData((prev) => ({ ...prev, projectName: event.target.value }))
                    }
                />
            </div>
            <InputControl
                label="Overview"
                value={projectData.description}
                placeholder="Enter basic overview of project"
                onChange={(event) =>
                    setprojectData((prev) => ({ ...prev, description: event.target.value }))
                }
            />
            <InputControl
                label="Overview"
                value={projectData.techStack}
                placeholder="Enter Tech stack used"
                onChange={(event) =>
                    setprojectData((prev) => ({ ...prev, techStack: event.target.value }))
                }
            />
            <div style={{ color: 'red' }}>{errorMessages.common}</div>

        </div>
    );
    const educationBody = (
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl
                    label="Title"
                    value={educationData.courseName}
                    placeholder="Enter Degree name eg. B-tech"
                    onChange={(event) =>
                        seteducationData((prev) => ({ ...prev, courseName: event.target.value }))
                    }
                />
            </div>
            <InputControl
                label="College/School Name"
                value={educationData.college}
                placeholder="Enter name of your college"
                onChange={(event) =>
                    seteducationData((prev) => ({ ...prev, college: event.target.value }))
                }
            />

            <InputControl
                label="Percentage"
                value={educationData.percentage}
                placeholder="Enter percentage"
                onChange={(event) =>
                    seteducationData((prev) => ({ ...prev, percentage: event.target.value }))
                }
                errormsg={errorMessages.percentage}
            />

            <InputControl
                label="Completion year"
                value={educationData.completionYear}
                placeholder="Enter Completion year"
                onChange={(event) =>
                    seteducationData((prev) => ({ ...prev, completionYear: event.target.value }))
                }
                errormsg={errorMessages.completionYear}
            />

            <div style={{ color: 'red' }}>{errorMessages.common}</div>


        </div>
    );
    const basicInfoBody = (
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl
                    label="Name*"
                    placeholder="Enter your full name"
                    value={profileData.name}
                    onChange={(event) =>
                        setProfileData((prev) => ({ ...prev, name: event.target.value }))
                    }
                    errormsg={errorMessages.name}
                />
                <InputControl
                    label="Address*"
                    value={profileData.address}
                    placeholder="Enter your address"
                    onChange={(event) =>
                        setProfileData((prev) => ({ ...prev, address: event.target.value }))
                    }
                    errormsg={errorMessages.address}
                />
            </div>
            <div className={styles.row}>
                <InputControl
                    label="Linkedin Link"
                    value={profileData.linkedin}
                    placeholder="Enter your linkedin profile link"
                    onChange={(event) =>
                        setProfileData((prev) => ({ ...prev, linkedin: event.target.value }))
                    }
                    errormsg={errorMessages.linkedin}

                />
                <InputControl
                    label="Github Link"
                    value={profileData.github}
                    placeholder="Enter your github profile link"
                    onChange={(event) =>
                        setProfileData((prev) => ({ ...prev, github: event.target.value }))
                    }
                    errormsg={errorMessages.github}
                />
            </div>
            <div className={styles.row}>
                <InputControl
                    label="Email*"
                    value={profileData.email}
                    placeholder="Enter your email"
                    onChange={(event) =>
                        setProfileData((prev) => ({ ...prev, email: event.target.value }))
                    }
                    errormsg={errorMessages.email}
                />
                <InputControl
                    label="Enter phone*"
                    value={profileData.phone}
                    placeholder="Enter your phone number"
                    onChange={(event) =>
                        setProfileData((prev) => ({ ...prev, phone: event.target.value }))
                    }
                    errormsg={errorMessages.phone}
                />
            </div>

            <div style={{ color: 'red' }}>{errorMessages.common}</div>

        </div>
    );
    const skillsBody = (
        <div className={styles.detail}>
            <div className={styles.column}>
                <label>List your top 5 skills</label>
                <InputControl
                    placeholder="Skill 1"
                    value={skillsData[0]}
                    onChange={(event) => {
                        setskillsData((prev) => ({ ...prev, 0: event.target.value }))

                    }}
                />
                <InputControl
                    placeholder="Skill 2"
                    value={skillsData[1]}
                    onChange={(event) => {
                        setskillsData((prev) => ({ ...prev, 1: event.target.value }))

                    }}
                />
                <InputControl
                    placeholder="Skill 3"
                    value={skillsData[2]}
                    onChange={(event) => {
                        setskillsData((prev) => ({ ...prev, 2: event.target.value }))

                    }}
                />
                <InputControl
                    placeholder="Skill 4"
                    value={skillsData[3]}
                    onChange={(event) => {
                        setskillsData((prev) => ({ ...prev, 3: event.target.value }))

                    }}
                />
                <InputControl
                    placeholder="Skill 5"
                    value={skillsData[4]}
                    onChange={(event) => {
                        setskillsData((prev) => ({ ...prev, 4: event.target.value }))

                    }}
                />

            </div>
            <div style={{ color: 'red' }}>{errorMessages.common}</div>

        </div>
    );

    const generateBody = () => {
        switch (sections[activeSectionKey]) {
            case sections.basicInfo:
                return basicInfoBody;
            case sections.workExp:
                return workExpBody;
            case sections.project:
                return projectBody;
            case sections.education:
                return educationBody;
            case sections.skills:
                return skillsBody;
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                {Object.keys(sections)?.map((key) => (
                    <div
                        className={`${styles.section} ${activeSectionKey === key ? styles.active : ""
                            }`}
                        key={key}
                        onClick={() => { setActiveSectionKey(key) }}
                    >
                        {sections[key]}
                    </div>
                ))}
            </div>

            <div className={styles.body}>

                {generateBody()}

                <button onClick={handleSubmission}>Save</button>
            </div>
        </div>

    );
}

export default Editor;
