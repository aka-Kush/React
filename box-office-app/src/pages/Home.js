import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'
import { apiGet } from '../misc/config';

const Home = () => {

    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');
    const isShowsSearch = searchOption === 'shows';

    const onInputChange = (event) => {
        setInput(event.target.value);
    }

    const onSearch = () => {
        apiGet(`/search/${searchOption}?q=${input}`)
            .then(result => {
                setResults(result);
            })
    };

    const onKeyDown = (event) => {
        if (event.keyCode === 13) {
            onSearch();
        };
    }

    const onRadioChange = (event) => {
        setSearchOption(event.target.value);
    }
    console.log(searchOption);

    const renderResults = () => {
        if (results && results.length === 0) {
            return <div>No Results</div>
        };
        if (results && results.length > 0) {
            return results[0].show
                ? results.map((item) => (<div key={item.show.id}> {item.show.name} </div>))
                : results.map((item) => (<div key={item.person.id}> {item.person.name} </div>))
        }
        return null;
    }

    return (
        <MainPageLayout>
            <input
                placeholder="Search here..."
                type="text"
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                value={input}
            />

            <div>
                <label htmlFor="shows-search">
                    Shows
                    <input
                        id="shows-search"
                        type="radio"
                        value="shows"
                        checked={isShowsSearch}
                        onChange={onRadioChange}
                    />
                </label>

                <label htmlFor="people-search">
                    People
                    <input
                        id="people-search"
                        type="radio"
                        value="people"
                        checked={!isShowsSearch}
                        onChange={onRadioChange}
                    />
                </label>
            </div>

            <button type="button" onClick={onSearch}>Search</button>
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home
