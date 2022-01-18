import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setGetPostsPage } from '../redux/action'
import '../scss/components/pagination.scss'

const Pagination = ({ postsPerPage, totalPosts }) => {
    const paginPageWithPosts = []

    const dispatch = useDispatch()

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        paginPageWithPosts.push(i)
    }

    return (
        <div className='pagination'>
            {
                paginPageWithPosts.map(number => (
                  <a key={number} href="#posts"><button   onClick={() => dispatch(setGetPostsPage(number, postsPerPage))}>{number}</button></a>
                ))
            }
        </div>
    )
}

export default Pagination