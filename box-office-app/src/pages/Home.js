import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'

const Home = () => {

    const [input, setInput] = useState('');

    const onInputChange = (event) => {
        setInput(event.target.value);
    }

    const onSearch = () => {
        // https://www.tvmaze.com/api
        fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
            .then(res => res.json())
            .then(data => console.log(data))
    }

    const onKeyDown = (event) => {
        if (event.keyCode === 13) {
            onSearch();
        };
    }

    return (
        <MainPageLayout>
            <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input} />
            <button type="button" onClick={onSearch}>Search</button>
        </MainPageLayout>
    )
}

export default Home
