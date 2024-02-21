import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useResume } from '../../context/ResumeProvider';
import './Style.css'
const ResumeModel = () => {
  const componentRef = useRef();
  const { profileData, educationFormData, skillsFormData, projectsFormData, experienceFormData, socialLinksFormData } = useResume();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>

      <div ref={componentRef} className="parentResumeModel">
        <div className="resumeContent">
          <div>

            {/* Profile Section */}
            <div className="profileSection">
              {profileData.url && <img src={profileData.url} alt="Profile" width="100" height="100" />}
              <h2>{`${profileData.name}`}</h2>
              <p>{profileData.address}</p>
              <p>{profileData.phone} {profileData.email} </p>
              <p><a href={profileData.github} target="_blank" rel="noopener noreferrer">Github</a>  <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer">Linkedin</a></p>

            </div>


            {/* Education Section */}
            <div className="educationSection">
              <h2>Education</h2>
              <hr></hr>

              {Array.isArray(educationFormData) && educationFormData.length > 0 ? (
                educationFormData.map((edu, index) => (
                  <ul key={index}>
                    <soan className='right'>{edu.completionYear}</soan>
                    <li><h4>{edu.college}</h4></li>
                    <p className='right'>{edu.percentage}%</p>
                    <p>Course: {edu.courseName}</p>

                  </ul>
                ))
              ) : (
                <p>No education data available</p>
              )}
            </div>

          </div>




          {/* Skills Section */}
          <div className="skillsSection">
            <h2>Skills</h2>
            <hr></hr>


            {Array.isArray(skillsFormData) && skillsFormData.length > 0 ? (
              <ul>
                {Object.values(skillsFormData[0]).map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No skills data available</p>
            )}
          </div>


          <div>

            <div className="experienceSection">
              <h2>Experience</h2>
              <hr></hr>

              {Array.isArray(experienceFormData) && experienceFormData.length > 0 ? (
                experienceFormData.map((index, idx) => (
                  <ul key={idx}>
                    <p className='right'>{index.startDate} - {index.endDate}</p>
                    <li><h3>{index.company}</h3></li>
                    <h4 style={{ "margin-top": "-10px" }}> {index.jobTitle}</h4>
                    <p>{index.description}</p>
                  </ul>
                ))
              ) : (
                <p>No experience data available</p>
              )}
            </div>

            {/* Projects Section */}
            <div className="projectsSection">
              <h2>Projects</h2>
              <hr></hr>
              {Array.isArray(projectsFormData) && projectsFormData.length > 0 ? (
                projectsFormData.map((project, index) => (
                  <ul key={index}>
                    <li><h3>{project.projectName}</h3></li>
                    <h5 style={{ "margin-top": "0" }}> {project.description}</h5>
                    <h5 style={{ "margin-top": "-5px" }}>Tech Stack - <spn>{project.techStack}</spn></h5>
                  </ul>
                ))
              ) : (
                <p>No projects data available</p>
              )}
            </div>



          </div>


        </div>
      </div>
      <button onClick={handlePrint}>Download / Preview</button>

    </div>
  );
};

export default ResumeModel;
