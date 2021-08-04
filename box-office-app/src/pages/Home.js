import React, { useState, useCallback } from 'react'
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout'
import PeopleGrid from '../components/people/PeopleGrid';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';

const renderResults = (results) => {
    if (results && results.length === 0) {
        return <div>No Results</div>
    };
    if (results && results.length > 0) {
        return results[0].show
            ? <ShowGrid data={results}/>
            : <PeopleGrid data={results}/>
    }
    return null;
}

const Home = () => {

    const [input, setInput] = useLastQuery();
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');
    const isShowsSearch = searchOption === 'shows';

    const onInputChange = useCallback((event) => {
        setInput(event.target.value);
    }, [setInput]);

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

    const onRadioChange = useCallback((event) => {
        setSearchOption(event.target.value);
    }, []);

    return (
        <MainPageLayout>
            <SearchInput
                placeholder="Search here..."
                type="text"
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                value={input}
            />

            <RadioInputsWrapper>
                <div>
                    <CustomRadio
                        label="Shows"
                        id="shows-search"
                        value="shows"
                        checked={isShowsSearch}
                        onChange={onRadioChange}
                    />
                </div>
                <div>
                    <CustomRadio
                        label="People"
                        id="people-search"
                        value="people"
                        checked={!isShowsSearch}
                        onChange={onRadioChange}
                    />
                </div>
            </RadioInputsWrapper>
            <SearchButtonWrapper>
                <button type="button" onClick={onSearch}>Search</button>
            </SearchButtonWrapper>
            {renderResults(results)}
            
        </MainPageLayout>
    )
}

export default Home
