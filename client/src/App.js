import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './context/AuthContext'
import Dashboard from './views/Dashboard'
import ProtectRoute from './components/routing/ProtectRoute'
import About from './views/About'
import PostContextProvider from './context/PostContext'

const App = () => {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" render={props => <Auth {...props} authRoute='login' />} />
            <Route exact path="/register" render={props => <Auth {...props} authRoute='register' />} />
            <ProtectRoute exact path='/dashboard' component={Dashboard} />
            <ProtectRoute exact path='/about' component={About} />
          </Switch>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  )
}

export default App