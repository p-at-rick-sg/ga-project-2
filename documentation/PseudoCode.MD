**Context** I will use a single context to start with to store: User State/Information Default MUI
Theme Object Any theme adjustments to the default theme

**Custom Hooks** I will create a hooks folder and use custom hooks where possible to reduce repeated
code in the components. At a high level this will inlcude:

useFetch - maybe more than 1 depending on the complexity/variation in headers - for example I may
have a useFetchBearer and a useFetchData 

**Context**
I will use a userContext for user logged in state and data relevant to that 
I may add a themeContext to enable me to update MUI theme settings globally or on a route basis and add light/dark modifier at a later date.

**Main Page Component**

<NavBar />
Diplay the main header, menus and user logged in/out icon. This will be dynamic based on the user logged in state and type of user:

Check for use login status and account type (user, recruiter, admin) If the user is logged in,
display the correct display page If there is no login, display the main public page
<App />
Will hold the login functionality and upadte the state that controls this


**UserDisplay Component** 

Show users name Allow user to upadte their details Allow user to update
their job skills Submit these details - it will save to the airtablke database ( I would have by
preference used firebase but hey ho!)

Allow user to browse the job roles that are matched with their skills (this will autopopulate on
load if they previously set their skills or after they add them)

**RecruiterDisplay Component** 

Shows the recruiters name and company - based on the user contect
variable All the recruiter to update their company profile - do in a sub-component or modal that is
specific to this task Allow the recruiter to post a job on the site - do in a sub component or modal
that

**AdminDisplay Component** This is out of scope at this point - admin of users can be done directly
in thew Airtable database
