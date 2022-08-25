import React, { useState, useEffect } from "react";
import axios from 'axios';

const Convert = ({ language, text }) => {

    // reduce number of api requests so not triggered on every key event
    const [debouncedText, setDebouncedText] = useState(text);
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [text]);

    // do translation; NB the API key is provided by Udemy and will only work from localhost:3000
    const [translated, setTranslated] = useState('');
    useEffect(() => {
        const doTranslation = async () => {
            const {data} = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: debouncedText,
                    target: language.value,
                    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                }
            });

            setTranslated(data.data.translations[0].translatedText)
        };

        doTranslation();
    }, [language, debouncedText]);

    return (
        <div>
            <h1 className="ui header">{translated}</h1>
        </div>
    );
};

export default Convert;