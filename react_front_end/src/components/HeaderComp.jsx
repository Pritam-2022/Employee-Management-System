import React, { Component } from 'react';

class HeaderComp extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {  }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="http://google.com" className="navbar-brand">Employee Management System</a></div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComp;