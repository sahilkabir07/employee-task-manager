import React from 'react'
import Header from '../../pageComponents/Header'
import CreateTask from '../../pageComponents/CreateTask'
import AllTasks from '../../pageComponents/AllTasks'

const AdminDashboard = (props) => {
    return (
        <div className='h-full w-full p-5 bg-[#111]'>
            <Header changeUser={props.changeUser} />
            <CreateTask />
            <AllTasks />
        </div >
    )
}

export default AdminDashboard