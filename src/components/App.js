import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MoviesList from './MoviesList';
import MovieCreate from './MovieCreate';
import MovieCard from './MovieCard';
import Header from './Header';
import MovieSearch from '../components/Search Movie/MovieSearch';
import MovieDelete from './MovieDelete';
import MovieEdit from './MovieEdit';

function App() {
  return (
    <React.Fragment>
        <BrowserRouter>
          <Header />
          <div className="ui container">
            <Switch>
              <Route path="/" exact component={MoviesList} />
              <Route path="/movies/new"  component={MovieCreate} /> 
              <Route path="/movies/delete/:id"  component={MovieDelete} />
              <Route path="/movies/edit/:id"  component={MovieEdit} />
              <Route path="/movies/search" component={MovieSearch} />
              <Route path="/movies/:id" component={MovieCard} />
            </Switch>
            </div>
        </BrowserRouter>
      
      </React.Fragment>
  );
}
export default App;
