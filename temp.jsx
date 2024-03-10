const [user, setUser] = useState({email: 'patrick.kittle@gmail.com', name: 'Patrick'}); // this will start as null after testing
const logout = () => {
  setUser(null);
};

const defaultTheme = createTheme(); //using context to pass this down to each component
