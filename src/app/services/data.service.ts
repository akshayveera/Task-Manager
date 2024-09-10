import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  categories: string[] = [
    "documentation",
    "development",
    "testing",
    "security",
    "design",
    "performance",
    "operations"
  ];

  tasksData : any[] = [
    {
      "id": "1238",
      "title": "Resolve Security Vulnerability",
      "desc": "Patch the identified security vulnerability in the authentication module.",
      "priority": "5",
      "category": "security",
      "postedAt": "Aug 20 2024",
      "deadline": "Sep 01 2024",
      "status": "completed"
    },
    {
      "id": "1243",
      "title": "Set Up Automated Backups",
      "desc": "Implement an automated backup system for data security.",
      "priority": "2",
      "category": "operations",
      "postedAt": "Aug 21 2024",
      "deadline": "Sep 05 2024",
      "status": "incomplete"
    },
    {
      "id": "1237",
      "title": "Conduct User Testing",
      "desc": "Schedule and conduct user testing for the new feature rollout.",
      "priority": "2",
      "category": "testing",
      "postedAt": "Aug 22 2024",
      "deadline": "Sep 02 2024",
      "status": "incomplete"
    },
    {
      "id": "1235",
      "title": "Update Documentation",
      "desc": "The API documentation needs to be updated to reflect the latest changes.",
      "priority": "3",
      "category": "documentation",
      "postedAt": "Aug 23 2024",
      "deadline": "Sep 03 2024",
      "status": "incomplete"
    },
    {
      "id": "1242",
      "title": "Improve System Performance",
      "desc": "Enhance the overall performance of the system.",
      "priority": "4",
      "category": "performance",
      "postedAt": "Aug 24 2024",
      "deadline": "Sep 08 2024",
      "status": "incomplete"
    },
    {
      "id": "1244",
      "title": "Review Code for Security Issues",
      "desc": "Conduct a thorough review of the codebase for potential security issues.",
      "priority": "5",
      "category": "security",
      "postedAt": "Aug 24 2024",
      "deadline": "Sep 04 2024",
      "status": "incomplete"
    },
    {
      "id": "1239",
      "title": "Refactor Codebase",
      "desc": "Refactor the legacy code to improve maintainability and readability.",
      "priority": "4",
      "category": "development",
      "postedAt": "Aug 25 2024",
      "deadline": "Sep 06 2024",
      "status": "completed"
    },
    {
      "id": "1240",
      "title": "Design New Feature UI",
      "desc": "Create the user interface design for the upcoming feature.",
      "priority": "3",
      "category": "design",
      "postedAt": "Aug 26 2024",
      "deadline": "Sep 07 2024",
      "status": "incomplete"
    },
    {
      "id": "1236",
      "title": "Optimize Database Queries",
      "desc": "Some queries are running slower than expected; optimize them for better performance.",
      "priority": "4",
      "category": "development",
      "postedAt": "Aug 26 2024",
      "deadline": "Sep 01 2024",
      "status": "incomplete"
    },
    {
      "id": "1241",
      "title": "Fix Login Issues",
      "desc": "Resolve the bugs causing login failures for users.",
      "priority": "5",
      "category": "development",
      "postedAt": "Aug 27 2024",
      "deadline": "Sep 02 2024",
      "status": "incomplete"
    }
  ]
  
  
  

  constructor() { }
}
