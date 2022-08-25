import React, {useState} from "react";
// useState is part of the hooks system, it is a function that allows the use of state in a functional component (rather than a class component)

const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    // where: activeIndex is piece of state, setActiveIndex is a function to change the piece of state activeIndex and null is the initial value for the piece of state activeIndex

    const onTitleClick = (index) => {
        setActiveIndex(index);
    }; // assign as arrow function so not called when page loaded, only called onClick

    const renderedItems = items.map((item, index) => {
        const active = index === activeIndex ? 'active' : '';
        
        return <React.Fragment key={item.title}>
            <div
                className={`title ${active}`}
                onClick={() => onTitleClick(index)}
            >
                <i className="dropdown icon"></i>
                {item.title}
            </div>
            <div className={`content ${active}`}>
                <p>{item.content}</p>
            </div>
        </React.Fragment>
    })
    return (
        <div className="ui styled accordion">
            {renderedItems}
        </div>
    );
};

export default Accordion;