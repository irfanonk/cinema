import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MoviesList from './MoviesList';
import MovieCreate from './MovieCreate';
import MovieCard from './MovieCard';
import Header from './Header';
import MovieSearch from '../components/Search Movie/MovieSearch';
import MovieDelete from './MovieDelete';

function App() {
  return (
      <div className="ui container">
        <BrowserRouter>
          <div className="ui row">
          <Route component={Header} />
          </div>
          <Switch>
            <Route path="/" exact component={MoviesList} />
            <Route path="/movies/new"  component={MovieCreate} /> 
            <Route path="/movies/delete/:id"  component={MovieDelete} />
            <Route path="/movies/search" component={MovieSearch} />
            <Route path="/movies/:id" component={MovieCard} />
            
          </Switch>
        </BrowserRouter>
      </div>
  );
}
export default App;
