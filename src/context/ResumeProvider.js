import React, { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({});
  const [educationFormData, setEducationFormData] = useState({});
  const [skillsFormData, setSkillFormData] = useState({});
  const [projectsFormData, setProjectsFormData] = useState({});
  const [experienceFormData, setExperienceFormData] = useState({});
  const [socialLinksFormData, setSocialLinksFormData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    const storedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (storedIsLoggedIn && storedIsLoggedIn.value == "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  // Dummy data for each section
  const dummyProfileData = {
    name: "JoHn doe",
    address: "123 Main St",
    phone: "555-1234",
    email: "exmaple@email.com"
  };
  const dummySkillsData = ["React", "JavaScript", "CSS", "HTML", "NodeJs"];
  const dummyEducationData = [
    {
      college: "University Name",
      completionYear: "2024",
      courseName: "BTech(Computer Science)",
      percentage: "95",
    }
  ];
  const dummyExperienceData = [
    {
      jobTitle: "Software Developer",
      company: "XYX",
      startDate: "2020-01-01",
      endDate: "2022-12-31",
      description: "Worked on Software development. Api development.",
    }
  ];
  const dummyProjectsData = [
    {
      projectName: "Resume Project",
      description: "Built a dynmaic react cv generator application.",
      techStack: "React, Node.js, MongoDB",
    }
  ];
  const dummySocialLinksData = ["https://linkedin.com/dummy", "https://twitter.com/dummy"];

  // Function to set dummy data in local storage
  const setDummyDataInLocalStorage = () => {
    localStorage.setItem('profileData', JSON.stringify(dummyProfileData));
    localStorage.setItem('skillsData', JSON.stringify(dummySkillsData));
    localStorage.setItem('educationFormData', JSON.stringify(dummyEducationData));
    localStorage.setItem('experienceFormData', JSON.stringify(dummyExperienceData));
    localStorage.setItem('projectsFormData', JSON.stringify(dummyProjectsData));
    localStorage.setItem('socialLinksFormData', JSON.stringify(dummySocialLinksData));
  };

  useEffect(() => {
    // Just for testing
    if (!localStorage.getItem('profileData'))
      setDummyDataInLocalStorage();
    login()
    try {

      const localProfileData = JSON.parse(localStorage.getItem('profileData')) || {};
      const localEducationFormData = JSON.parse(localStorage.getItem('educationFormData')) || [];
      const localSkillsFormData = JSON.parse(localStorage.getItem('skillsFormData')) || [];
      const localProjectsFormData = JSON.parse(localStorage.getItem('projectsFormData')) || [];
      const localExperienceFormData = JSON.parse(localStorage.getItem('experienceFormData')) || [];
      const localSocialLinksFormData = JSON.parse(localStorage.getItem('socialLinksFormData')) || [];

      setProfileData(localProfileData);
      setEducationFormData(localEducationFormData);
      setProjectsFormData(localProjectsFormData);
      setSkillFormData(localSkillsFormData);
      setExperienceFormData(localExperienceFormData);
      setSocialLinksFormData(localSocialLinksFormData);
    } catch (error) {
      console.error("Error parsing JSON:", error);

    }
  }, []);

  return (
    <ResumeContext.Provider value={{ isLoggedIn,setIsLoggedIn,profileData, educationFormData, skillsFormData, projectsFormData, experienceFormData, socialLinksFormData }}>
      {children}
    </ResumeContext.Provider>
  );
};

