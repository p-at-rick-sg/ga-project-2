# ga-project-2 - Patrick Kittle
 React Front End Project

**Recruitment Web Site - JobFinder**
I have chosen to create a recruitment portal app for my project 2. 

*Overview*
The app will consist of 3 key areas:
- User/Job Seeker
- Recruiter/Job Poster
- Admin Page (Site owners)

*Basic Functionailty*
I will be deploying the bare bones of the site for the project submission, but I will be using this projhect moving forward for a personal business enterprise.

1. A user will be able to browse to the main page and view (public) job postings wihtout logging in
2. User will be able to signup
3. User will be able to signin
4. After signin, user can set their personal details and job skills - these will be saved to the database
5. Job Postings will be aligned with users skills to show the recomended job openings

6. A recruiter wil be able to signup
7. A recruiter will be able to signin
8. A recruiter will be able to add job posting with a job description, key skills and location information

9. An admin portal will allow for the sdite owners to administer users accounts only at MVP

The above represents an MVP for a business launch - however I do not believe I will have time to deploy all of this functionality

**Routes**
I will use 3 routes for the app:
1. Landing '/'
2. Users '/users'
3. Recruiters '/recruiters'
4. Admin '/admin'

**Technologies Used**

Requirements Met:
- Javascript
- React Framework
- Airtable via API/Fetch Syntax

*Additional Technologies Used*
Google Auth - Not Deployed 
Material UI
STRETCH: Firebase - Used for the Jobs posting only 
STRETCH: Adzuna API (to pull public job postings into the site to drive traffic)

**Important Links**
Jira Board Link: https://patrickkittle.atlassian.net/jira/software/projects/GAP2/boards/1
Live Site Link: TBC
Wireframes Link: TBC - Again I canont make public without user signin - to check on that

**Screen Shots**

*Landing Page*

![Landing Page](https://github.com/p-at-rick-sg/ga-project-2/assets/143236703/2d16d993-c301-4b18-ab52-d7e698d2168e)

*User Main Screen*

![User Main Screen](https://github.com/p-at-rick-sg/ga-project-2/assets/143236703/87b85d32-2986-4da3-aded-64c22c8badb9)

*User Profile Update Screen*

![Profile Update](https://github.com/p-at-rick-sg/ga-project-2/assets/143236703/65cbd3dc-eb05-47f6-b141-88c1aebaa8bd)

*Login Screen*

![Login Page](https://github.com/p-at-rick-sg/ga-project-2/assets/143236703/2b809ce1-b528-45cc-aacf-5146d046057e)

*Signup Screen*

![User Signup Page](https://github.com/p-at-rick-sg/ga-project-2/assets/143236703/66af934e-b9ea-4db6-8085-d93c560617fb)


**Some of the Key Functions**

I had some fun forcing in the use of Airtable with native fetch - this required a lot of code to build the signup and login features, but  it was quite interesting.


**Lessons Learned**

Use the best tool for the job. Signup and login can be handled by external libraries and products.  This could have saved a lot of time.

Plan routing. I spent a lot of time working out issues with routing and redirection that could have been avoided.

Learning new products on the fly - I made a decision late on to use Material UI - while I'm sure it's are alyl good product, I didn't have time to properly research it before piling in to the aesthetics could have been better implemented.

**Future Plans**
I fully intend to rebuid this project using firebase for the db, auth and potentially hosting in order to better understnad it's capabilities.
There are several features in the icebox/backlog that I also want to  build, the recruiter side of the app for starters, and thenm an admin page.




