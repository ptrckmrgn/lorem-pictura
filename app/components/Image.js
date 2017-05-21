var React = require('react');
var Api = require('./utils/Api');

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoURL: null
        }
    }
    componentDidMount() {
        Api.photo().then(function(result) {
            return this.setState(function() {
                return {
                    photoURL: result.urls.full
                }
            })
        }.bind(this));
    }
    render() {
        return (
            <div id='photo-wrapper'>
                <img
                    id='photo'
                    src={this.state.photoURL}
                />
            </div>
        )
    }
}

module.exports = Image;