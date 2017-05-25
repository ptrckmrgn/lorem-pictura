var React = require('react');
var Generate = require('./Generate');
var Photo = require('./Photo');

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Generate />
            </div>
        )
    }
}

module.exports = App;