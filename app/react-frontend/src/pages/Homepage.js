import React from 'react';
import useFetch from "../hooks/useFetch"
import { CircularProgress } from "@material-ui/core";
import {Link} from "react-router-dom";
import { useQuery, gql } from "@apollo/client";


const REVIEWS = gql`
    query GetReviews {
        reviews {
            title,
            body,
            rating,
            id,
            categories {
                name,
                id
            }
        }
    }`;

const Homepage = () => {

    //const { loading, error, data } = useFetch('http://localhost:1337/reviews');
    const { loading, error, data } = useQuery(REVIEWS);
    if(loading) return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}><CircularProgress color={'primary'} /></div>
    if(error) return <p>Error while fetching data!</p>

    //console.log(data);
    return (
        <div>
            { data.reviews.map((review) => (
                <div key={review.id} className="review-card">
                    <div className="rating">{review.rating}</div>
                    <h2>{review.title}</h2>
                    {review.categories.map(category => (
                        <small key={category.id}>{ category.name }</small>
                    ))}
                    <p>{review.body.substr(0, 200)}...</p>
                    <Link to={`/details/${review.id}`}>Read more</Link>
                </div>
            )) }
        </div>
    );
};

export default Homepage;
