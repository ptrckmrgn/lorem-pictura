var React = require('react');
var PropTypes = require('prop-types');

var styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    },
    background: {
        width: '400',
        height: '400',
        backgroundImage: '',
        backgroundSize: 'cover'
    }
};

class Loading extends React.Component {
    constructor(props) {
        super(props);

        styles.background.backgroundImage = 'url(' + this.props.img + ')';

        this.state = {
            text: props.text
        }
    }
    componentDidMount() {
        var stopper = this.props.text + '...';
        this.interval = window.setInterval(function () {
            if (this.state.text === stopper) {
                this.setState(function() {
                    return {
                        text: this.props.text
                    };
                });
            }
            else {
                this.setState(function(prevState){
                     return {
                         text: prevState.text + '.'
                     };
                });
            }
        }.bind(this), this.props.speed);
    }
    componentWillUnmount() {
        window.clearInterval(this.interval);
    }
    render() {
        return (
            <div className='loading' style={styles.background}>
                <p style={styles.content}>
                    {this.state.text}
                </p>
            </div>
        )
    }
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
};

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
};

module.exports = Loading;