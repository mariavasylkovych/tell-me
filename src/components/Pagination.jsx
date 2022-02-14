// import classNames from 'classnames'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setGetPostsPage } from '../redux/action'
import '../scss/components/pagination.scss'

const Pagination = ({ postsPerPage, totalPosts }) => {
    // const [active, setActive] = React.useState(false)
    const paginPageWithPosts = []

    const dispatch = useDispatch()

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        paginPageWithPosts.push(i)
    }

    const pagFunc = (number) => {
        dispatch(setGetPostsPage(number, postsPerPage))
        // paginate(number)
        // setActive(true)
}

    return (
        <div className='pagination'>
            {
                paginPageWithPosts.map((number, index) => (
                 <button key={number} onClick={() => pagFunc(number)}>{number}</button>
                ))
            }
        </div>
    )
}

export default Pagination