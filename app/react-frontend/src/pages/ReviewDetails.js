import React from 'react';
import {Link, useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {CircularProgress} from "@material-ui/core";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from 'react-markdown';

const REVIEW = gql`
    query GetReview($id: ID!) {
        review(id: $id)  {
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
`

const ReviewDetails = () => {

    const { id } = useParams();
    //const { loading, error, data } = useFetch(`http://localhost:1337/reviews/${id}`);
    const { loading, error, data } = useQuery(REVIEW, {
        variables: {
            id: id
        }
    });

    if(loading) return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}><CircularProgress color={'primary'} /></div>
    if(error) return <p>Error while fetching data!</p>

    console.log(data.review);
    return (
        <div className="review-card">
            <div className="rating">{data.review.rating}</div>
            <h2>{data.review.title}</h2>
            {data.review.categories.map(category => (
                <small key={category.id}>{ category.name }</small>
            ))}
            <ReactMarkdown>{data.review.body}</ReactMarkdown>
            <Link to={'/'}>Back</Link>
        </div>
    );
};

export default ReviewDetails;
