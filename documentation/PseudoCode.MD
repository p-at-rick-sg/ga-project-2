**Context** I will use a single context to start with to store: User State/Information Default MUI
Theme Object Any theme adjustments to the default theme

**Custom Hooks** I will create a hooks folder and use custom hooks where possible to reduce repeated
code in the components. At a high level this will inlcude:

useFetch - maybe more than 1 depending on the complexity/variation in headers - for example I may
have a useFetchBearer and a useFetchData 

**Context**
I will use a userContext for user logged in state and data relevant to that 
I may add a themeContext to enable me to update MUI theme settings globally or on a route basis and add light/dark modifier at a later date.

<App />
Will remain as the root of the project. Will have the global context applied at this level

<NavBar />
Diplay the main header, menus and user logged in/out icon. This will be dynamic based on the user logged in state and type of user:
Check for use login status and account type (user, recruiter, admin) If the user is logged in,
display the correct display page If there is no login, display the main public page

**Main Page Component**
Pull latest jobs form the database and display 5 of them in a list. Any click avtivity will redirect the user lo login or signup page.

**UserMain Component** 

Show users name in the Navbar as logged in user
Update Profile Buutton:
- Allow user to update their details 
Update Skills Button:
- Allow user to update their job skills & Submit these details - it will save to the airtable database or firebase

*UserDisplay*
List of all open job roles that meet the users location and skills. 
Allow user to change location parameter to update the job roles that are matched with their skills in different locations(this will autopopulate on load if they previously set their skills or after they add them)

**RecruiterMain Component** 

Shows the recruiters name and company - based on the user context andf role (recruiter).
Update Profile Button:
- Opens the recruiter update modal 
Update Company Button:
- Update their company profile modal
Post New Role Button
- open the post a job modal 

*RecruiterDisplay*
Shows a list of the jobs - with a filter for active (default), draft and closed. Each item will have a button to open the details/update the posting

**AdminDisplay Component** This is out of scope at this point - admin of users can be done directly
in thew Airtable database
