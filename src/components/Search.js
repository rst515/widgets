import React, { useState, useEffect } from "react";
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term,
                },
            });

            setResults(data.query.search); // rerenders results
        };

        if (term && !results.length) {
            search();
        } else {
            const timeoutId = setTimeout(() => {
                if (term) {
                    search();
                }
            }, 500);
            return () => {
                clearTimeout(timeoutId);
            };
        };
       
    }, [term]);
    // second argument after }, can be one of 3 options: [] to run at first initial render only (not when rerendered), nothing to run at initial render and after every rerender, or [data] to run at initial render and after every rerender IF data has changed since last rerender
    // cannot mark as async so use variable in side

    const renderedResults = results.map((result) => {
        return (
            <div className="item" key={result.pageid}>
                <div className="right floated content">
                    <a className="ui button"
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                    >Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>
            </div>
        );
    });

    return (
        <div>   
            <div className="ui form">
                <label>Enter Search Term</label>
                <input
                    value={term}
                    className="input"
                    onChange={e => setTerm(e.target.value)}
                />
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    );
}

export default Search;