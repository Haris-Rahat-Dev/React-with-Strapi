import React from 'react';
import { Link } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client";
import {CircularProgress} from "@material-ui/core";

const CATEGORIES =  gql`
  query GetCategories {
      categories {
          name,
          id
      }
  }  
`

const SiteHeader = () => {

    const { loading, error, data } = useQuery(CATEGORIES);
    if(loading) return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}><CircularProgress color={'primary'} /></div>
    if(error) return <p>Error while fetching data!</p>

    return (
        <div className="site-header">
            <Link to="/"><h1>Ninja Reviews</h1></Link>
            <nav className="categories">
                <span>
                    Filter reviews by category:
                </span>
                { data.categories.map((category) => (
                    <Link key={category.id} to={`/category/${category.id}`}> {category.name} </Link>
                )) }
            </nav>
        </div>
    );
};

export default SiteHeader;
