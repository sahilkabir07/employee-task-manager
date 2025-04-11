
const employees = [
    {
        "id": 1,
        "firstname": "Amit",
        "email": "employee1@example.com",
        "password": "123",
        "tasks": [
            {
                "taskTitle": "Submit Report",
                "taskDescription": "Submit the quarterly report to the manager.",
                "taskDate": "2025-03-27",
                "category": "Reporting",
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false
            },
            {
                "taskTitle": "Client Meeting",
                "taskDescription": "Discuss project updates with the client.",
                "taskDate": "2025-03-28",
                "category": "Meeting",
                "active": false,
                "newTask": true,
                "completed": false,
                "failed": false
            }
        ],
        "taskCount": { "active": 1, "newTask": 1, "completed": 0, "failed": 0 }
    },
    {
        "id": 2,
        "firstname": "Rohan",
        "email": "employee2@example.com",
        "password": "123",
        "tasks": [
            {
                "taskTitle": "Prepare Presentation",
                "taskDescription": "Create a PowerPoint presentation for the team meeting.",
                "taskDate": "2025-03-27",
                "category": "Documentation",
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false
            },
            {
                "taskTitle": "Fix Server Issue",
                "taskDescription": "Investigate and resolve server downtime problem.",
                "taskDate": "2025-03-29",
                "category": "IT Support",
                "active": false,
                "newTask": false,
                "completed": false,
                "failed": true
            }
        ],
        "taskCount": { "active": 1, "newTask": 0, "completed": 0, "failed": 1 }
    },
    {
        "id": 3,
        "firstname": "Suresh",
        "email": "employee3@example.com",
        "password": "123",
        "tasks": [
            {
                "taskTitle": "Write Blog Post",
                "taskDescription": "Draft a new blog post for the company website.",
                "taskDate": "2025-03-26",
                "category": "Marketing",
                "active": false,
                "newTask": false,
                "completed": true,
                "failed": false
            },
            {
                "taskTitle": "Update Security Policies",
                "taskDescription": "Review and update internal security policies.",
                "taskDate": "2025-03-31",
                "category": "Compliance",
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false
            }
        ],
        "taskCount": { "active": 1, "newTask": 0, "completed": 1, "failed": 0 }
    },
    {
        "id": 4,
        "firstname": "Rajesh",
        "email": "employee4@example.com",
        "password": "123",
        "tasks": [
            {
                "taskTitle": "Team Training",
                "taskDescription": "Conduct training on new software tools.",
                "taskDate": "2025-04-01",
                "category": "Training",
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false
            },
            {
                "taskTitle": "Budget Analysis",
                "taskDescription": "Analyze department expenses for Q1.",
                "taskDate": "2025-04-02",
                "category": "Finance",
                "active": false,
                "newTask": false,
                "completed": true,
                "failed": false
            }
        ],
        "taskCount": { "active": 1, "newTask": 0, "completed": 1, "failed": 0 }
    },
    {
        "id": 5,
        "firstname": "Vikram",
        "email": "employee5@example.com",
        "password": "123",
        "tasks": [
            {
                "taskTitle": "Social Media Strategy",
                "taskDescription": "Plan a new social media campaign.",
                "taskDate": "2025-03-28",
                "category": "Marketing",
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false
            },
            {
                "taskTitle": "Client Feedback Analysis",
                "taskDescription": "Analyze customer feedback from surveys.",
                "taskDate": "2025-03-30",
                "category": "Customer Support",
                "active": false,
                "newTask": false,
                "completed": false,
                "failed": true
            }
        ],
        "taskCount": { "active": 1, "newTask": 5, "completed": 0, "failed": 1 }
    }
]

const admin = [
    {
        "id": 100,
        "email": "admin@example.com",
        "password": "123"
    }
];


export const setLocalStorage = () => {
    localStorage.setItem("employees", JSON.stringify(employees));
    localStorage.setItem("admin", JSON.stringify(admin));
};

export const getLocalStorage = () => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const admin = JSON.parse(localStorage.getItem("admin")) || {};

    return { dataEmployees: employees, dataAdmin: admin };
};





