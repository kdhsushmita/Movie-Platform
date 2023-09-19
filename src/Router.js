import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Index from './pages/Index'
import SingleMovie from './pages/SingleMovie'
import AddMovie from './pages/AddMovie.js'
import Login from './pages/Login'
import Profile from './pages/Profile'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Index} exact />
                <Route path="/SingleMovie/:id" component={SingleMovie} exact />
                <Route path="/add" component={AddMovie} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/profile" component={Profile} exact />
            </Switch>
        </BrowserRouter>
    )
}

export default Router
