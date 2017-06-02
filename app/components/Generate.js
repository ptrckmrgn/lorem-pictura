var React = require('react');
var PropTypes = require('prop-types');
var Api = require('./utils/Api');
var Manipulate = require('./Manipulate');

class Generate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photos: [],
            position: 0,
            loading: true
        }

        this.handleUndo = this.handleUndo.bind(this);
        this.handleGenerate = this.handleGenerate.bind(this);
    }

    getPhotos() {
        Api.photos().then(function(result) {
            return this.setState(function(prevState) {
                return {
                    photos: prevState.photos.concat(result),
                    loading: false
                };
            });
        }.bind(this));
    }

    componentDidMount() {
        this.getPhotos();
    }

    handleUndo(event) {
        event.preventDefault();
        // Decrement 1 photo through the array
        if (this.state.position > 0) {
            this.setState(function(prevState) {
                return {
                    position: prevState.position - 1
                };
            });
        }
    }

    handleGenerate(event) {
        // TODO: disable button while image loads
        event.preventDefault();

        // Get photos from API if array has only one photo left
        if (this.state.photos.length - 2 === this.state.position) {
            this.getPhotos();
        }

        // Increment 1 photo through the array
        this.setState(function(prevState) {
            return {
                position: prevState.position + 1
            };
        });
    }

    render() {
        if (this.state.loading === true) {
            return <div>Loading</div>;
        }

        return (
            <div className="container">
                <div id='generate-wrapper'>
                    <form onSubmit={this.handleUndo}>
                        <button
                            className='button'
                            type='submit'
                            disabled={!this.state.position}>Undo
                        </button>
                    </form>
                    <form onSubmit={this.handleGenerate}>
                        <button
                            className='button'
                            type='submit'>Generate
                        </button>
                    </form>
                </div>
                <Manipulate photo={this.state.photos[this.state.position]}/>
            </div>
        )
    }
}

// TODO: PropTypes

module.exports = Generate;