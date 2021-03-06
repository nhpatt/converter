import React, {useState} from 'react';
import './App.css';
import ThemeContext from "./ThemeContext";
import Converter from "./Converter";
import usePreferredColorScheme from "./usePreferredColorScheme";
import useCachedState from "./useCachedState";

function App() {

    const [premium, setPremium] = useCachedState('premium');
    const [theme, setTheme] = useCachedState('theme');

    const [maxConversions, setMaxConversions] = useState(false);
    const color = usePreferredColorScheme();

    if (color !== theme) {
        setTheme(color);
    }

    let conversions = 5;

    const onChange = () => {
        conversions--;
        if (conversions === 0 && !premium) {
            setMaxConversions(true);
        }
    };

    return (
        <ThemeContext.Provider value={{theme: theme, premium: premium}}>

            {maxConversions && <div>freemium conversion model failed</div>}

            <select onChange={event => setTheme(event.target.value)} value={theme}>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
            </select>

            <Converter cryptoName={"BTC"} header={"My BTC Converter"} exchangeRate={2} onChange={onChange}/>

            <Converter cryptoName={"ETH"} exchangeRate={1.2} onChange={onChange} focusOnMount/>

            {!premium ?
                (<button onClick={() => setPremium(true)}>Become Premium</button>) :
                (<span>You are premium</span>)
            }

        </ThemeContext.Provider>
    );
}

export default App;
