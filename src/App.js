import { CssBaseline, Slide } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import "./App.css";
import MainRouter from "./routes";

function App() {
  // const state = useSelector(state => state)
  // console.log(state)
  // const { token } = useSelector(state => state.auth)

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   if(token){
  //     console.log('token already')
  //   } else {
  //     console.log('no token')
  //     dispatch(logInSuccess('alo mot hai ba'))
  //   }
  // }, [token])

  return (
    <div className="App">
      <CssBaseline />
      <SnackbarProvider
        maxSnack={4}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={Slide}
      >
        <MainRouter />
      </SnackbarProvider>
    </div>
  );
}

export default App;
