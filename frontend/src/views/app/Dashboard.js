import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import projectService from '../../services/ProjectService.js'
import userService from '../../services/UserService.js'
import issueService from '../../services/IssueService.js'
import Project from '../../components/Project.js'
import CreateProjectPopup from './CreateProjectPopup.js'


const Dashboard = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [createProjectState, setCreateProjectState] = useState(false)
  const [issues, setIssues] = useState([])
  const [newProject, setNewProject] = useState('')

  const addProject = e => {
    e.preventDefault()
    const projectObject = {
      project_name: newProject,
      user: user.pk
    }

    projectService
      .createProject(projectObject)
      .then(returnedProject => {
        setProjects(projects.concat(returnedProject))
        setNewProject('')
      }
    )
    toggleCreateProjectState()
  }

  const handleProjectChange = e => {
    setNewProject(e.target.value)
  }

  useEffect(() => {
    issueService
      .getAll()
      .then(allIssues => {
        setIssues(allIssues)
      })
  }, [])
    
  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('http://localhost:3000/login')
    } else {
      userService
        .getUser()
        .then(curUser => {
          console.log(curUser)
          setUser(curUser)
          setLoading(false)
        })
    }
  }, [])

  useEffect(() => {
    console.log(user)
    projectService
      .getAll()
      .then(allProjects => setProjects(allProjects))
  }, [user, createProjectState])

  const toggleCreateProjectState = () => {
    setCreateProjectState(!createProjectState)
  }

  const removeName = id => {
    if (window.confirm("Are you sure you wish to delete this projecct?")) {
      projectService
        .deleteProject(id)
        .then(returnedProjects =>
          setProjects(projects.filter(project => project.pk !== id)))
    }
  }

  const projectsToShow = loading
    ? {}
    : projects.filter(project => project.user === user.pk)


  return (
    <div className='dashboard-content'>
      {loading === false && (
        <>
          <h1 className='page-title'>Dashboard</h1>
          <h2>Hello {user.username}!</h2>
          <table className='table table-hover'>
            <tr className='well well-sm'>
              <th>Project</th>
              <th># of Issues</th>
              <th>Actions</th>
            </tr>
            {projectsToShow.map(project =>
              <Project
                project={project}
                key={project.project_name}
                username={user.username}
                removeName={removeName}
                issues={issues}
              />
            )}
          </table>
          <button className='btn btn-primary' onClick={toggleCreateProjectState}>New Project</button>
          {createProjectState ? <CreateProjectPopup
            toggle={toggleCreateProjectState}
            newProject={newProject}
            addProject={addProject}
            handleProjectChange={handleProjectChange} /> : null}
        </>
      )}
    </div>
  )
}

export default Dashboard