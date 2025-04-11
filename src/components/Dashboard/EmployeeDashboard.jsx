import React from 'react'
import Header from '../../pageComponents/Header'
import TaskListCard from '../../pageComponents/TaskListCard'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = (props) => {
    return (
        <div className='p-10 bg-[#1C1C1C] h-full'>
            <Header changeUser={props.changeUser} data={props.data} />
            <TaskListCard data={props.data} />
            <TaskList data={props.data} />
        </div>

    )
}

export default EmployeeDashboard