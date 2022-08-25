import React from "react";

// navigation event
const Link = ({ className, href, children }) => {
    const onClick = (event) => {
        // if command or ctrl-click to open in new tab don't run the rest of the function
        if (event.metaKey || event.ctrlKey) {
            return;
        };

        event.preventDefault();
        window.history.pushState({}, '', href);

        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    return (
        <a
            className={className}
            href={href}
            onClick={onClick}
        >
            {children}
        </a>
    );
};

export default Link;