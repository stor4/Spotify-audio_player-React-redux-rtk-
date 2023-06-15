import React from "react";
import {Router, Route, Link, Redirect, useParams, Switch} from 'react-router-dom';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor} from "../../store/rootReducer/rootReducer";
import store from "../../store/rootReducer/rootReducer";
import createHistory from "history/createBrowserHistory";

import PlayBar from "../../components/audiobar/audiobar";
import Header from "../../components/header/header";

import PageMain from "../main/main";
import Page404 from "../404/Page 404";
import LoginForm from "../login/loginPage";
import SignUpPage from "../signUp/signUpPage";
import PagePlaylistSearch from "../search/playlistSearch/playlistSearchPage";
import PageTrackSearch from "../search/trackSearch/trackSearchPage";
import MyMusic from "../userMusic/myMusic";
import PageUploadMusic from "../upload/uploadPage";
import Profile from "../userProfile/profile";
import EditPage from "../editorPage/editPage";
import PageAboutUs from "../aboutUs/aboutUsPage";


const history = createHistory()
function Player() {
    return (
        <Router history={history}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Header></Header>
                    <div className="App">
                        <Switch>
                            <Route path="/search" component={PageTrackSearch} exact/>
                            <Route path="/playlistsearch" component={PagePlaylistSearch} exact/>
                            <Route path="/" component={PageMain} exact/>
                            <Route path="/about-us" component={PageAboutUs} exact/>
                            <Route path="/login" component={LoginForm} exact/>
                            <Route path='/signup' component={SignUpPage} exact/>
                            <Route path="/mymusic" component={MyMusic} exact/>
                            <Route path ='/upload' component={PageUploadMusic} exact/>
                            <Route path='/profile' component={Profile} exact/>
                            <Route path='/editor' component={EditPage} exact/>
                            <Route path="*" component={Page404} />
                        </Switch>
                    </div>
                    <PlayBar></PlayBar>
                </PersistGate>
            </Provider>
        </Router>
    );
}

export default Player