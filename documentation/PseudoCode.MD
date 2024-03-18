**Context** I will use a single context to start with to store: User State/Information Default MUI
Theme Object Any theme adjustments to the default theme usch as primary colour or fonts.

Custom hook to use the context: useUser

**Custom Hooks** I will create a hooks folder and use custom hooks where possible to reduce repeated
code in the components. At a high level this will inlcude:

useFetch - maybe more than 1 depending on the complexity/variation in headers - for example I may
have a useFetchBearer and a useFetchData.

useUser - to access the context
useFetch - to call fetch alls to API's
useFirebase - to call data from Firebase Firestore
useSignup - to connect to the Firestore auth API to create new Recruitment users
useSigin - to connect to Firestore auth API to signin existing Recruitment users

**Context**
I will use a userContext for user logged in state and data relevant to that.
I have a useRecruiter context for recruitment users - this also holds the state regarding Firebase auth and a different MUI theme so we can have different colours and tyles for users and recruiters

<App />
Will remain as the root of the project. We will apply the global contexts at this level.

<NavBar />
Diplay the main header, menus and user logged in/out icon. This will be dynamic based on the user logged in state and type of user:
Check for use login status and account type (user, recruiter, admin) If the user is logged in,
display the correct display page If there is no login, display the main public page.
Update Profile Button:
- Allow user to update their details if they are logged in


**Main Page Component**
Pull latest jobs form the database and display 5 of them in a list. Any click avtivity will redirect the user lo login or signup page.

**User Signin Component**
Take in users first & last names, email, passord and password verification.

Validate details - checks for length of names, valid email address format and that the password and password check fields match.
If OK then sets the errors to 0

Submit function then sets submit to true. Based on these 2 values being correct, the addUser function then calls useFetch to add the users to the users table.

**UserProfileUpdate Component** 

Show users name in the Navbar as logged in user - clicking this opens the userProfileUpate component.
(All state Propped down from UserDisplay or the user Context)
Display existing profile elements
Update functions for:
Name
Skills (moving this to the main page)
Primary Location
Secondary Location
Preferred job Title for search accuracy

Update Skills Button:
- Allow user to update their job skills & Submit these details - it will save to the airtable database or firebase

*UserDisplay* (All propped down from UserMain)
List of all open job roles that meet the users location and skills. 
Allow user to change location parameter to update the job roles that are matched with their skills in different locations(this will autopopulate on load if they previously set their skills or after they add them)


**RecruiterMain Component** 

Shows the recruiters name and company - based on the recruiter Context
Update Profile Button:
- Opens the recruiter update component
Update Company Button:
- Update their company profile component
Post New Role Button
- open the post a job modal 

*RecruiterDisplay*
Shows a list of the jobs - with a filter for active (default), draft and closed. Each item will have a button to open the details/update the posting

*RecruiterProfile* (All Propped down from RecruiterMain)
Display existing profile elements
Update functions for:
Name
Company Details
Locations
Company Users



**AdminDisplay Component** This is out of scope at this point - admin of users can be done directly
in the Airtable database
