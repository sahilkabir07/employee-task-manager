import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data }) => {

    return (
        <div id='tasklist' className='h-[55%] overflow-x-auto w-full mt-10 flex items-center justify-start flex-nowrap py-5 gap-5'>
            {data.tasks.map((elem, indx) => {
                if (elem.active) {
                    return <AcceptTask key={indx} data={elem} />
                }
                if (elem.newTask) {
                    return <NewTask key={indx} data={elem} />
                }
                if (elem.completed) {
                    return <CompleteTask key={indx} data={elem} />
                }
                if (elem.failed) {
                    return <FailedTask key={indx} data={elem} />
                }
                return null;
            })}
        </div>
    )
}

export default TaskList;
