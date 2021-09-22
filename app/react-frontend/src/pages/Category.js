import React from 'react';
import { useQuery, gql } from "@apollo/client";
import {Link, useParams} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";

const CATEGORY  = gql`
    query GetCategory($id: ID!){
        category(id: $id){
        name,
        id,
        reviews{
            title,
            body,
            rating,
            id,
            categories{
                name,
                id
            }
        }
    }
    }
`

const Category = () => {

    const { id } = useParams();
    const { loading, data, error } = useQuery(CATEGORY, {
        variables: {
            id: id
        }
    });
    if(loading) return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}><CircularProgress color={'primary'} /></div>
    if(error) return <p>Error while fetching data!</p>

    console.log(data);
    return (
        <div>
            <h2>{ data.category.name }</h2>
            { data.category.reviews.map((review) => (
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

export default Category;