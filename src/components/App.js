import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MoviesList from './MoviesList';
import MovieCreate from './MovieCreate';
import MovieCard from './MovieCard';
import Header from './Header';
import MovieSearch from '../components/Search Movie/MovieSearch';
import MovieDelete from './MovieDelete';
import MovieEdit from './MovieEdit';
import EmailLogin  from './auth/EmailLogin';
import CreateUser from './auth/CreateUser';
import UserProfileSidebar from './auth/UserProfileSidebar';

function App() {
  return (
    <React.Fragment>
        <BrowserRouter>
          <Header />
          <UserProfileSidebar />
          <div className="ui container">
            <Switch>
              <Route path="/" exact component={MoviesList} />
              <Route path="/movies/new"  component={MovieCreate} /> 
              <Route path="/movies/delete/:movieName"  component={MovieDelete} />
              <Route path="/movies/edit/:movieName"  component={MovieEdit} />
              <Route path="/movies/search" component={MovieSearch} />
              <Route path="/movies/:movieName" component={MovieCard} />
              <Route path='/EmailLogin' component={EmailLogin} />
              <Route path='/CreateUser' component={CreateUser} />
              {/* <Route path='/UserProfile/:userName' component={UserProfile} /> */}
            </Switch>
            </div>
        </BrowserRouter>
      
      </React.Fragment>
  );
}
export default App;
