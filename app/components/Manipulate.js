var React = require('react');
var PropTypes = require('prop-types');
var Loading = require('./Loading');

class Manipulate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            croppie: null,
            orientation: 1,
            points: [0, 0, this.props.photo.width, this.props.photo.height],
            zoom: true,
            cropWidth: 0,
            cropHeight: 0,
            viewportWidth: 0,
            viewportHeight: 0,
            boundaryWidth: 0,
            boundaryHeight: 0
        }

        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Updates the boundary limits for the image.
     */
    updateBoundary() {
        const UI_WIDTH = 0;
        const UI_HEIGHT = 120;

        if (typeof window.innerWidth !== undefined) {
            this.setState(function() {
                return {
                    boundaryWidth: window.innerWidth - UI_WIDTH,
                    boundaryHeight: window.innerHeight - UI_HEIGHT
                }
            });
        }
    }

    /**
     * Updates the limits for the image within the boundary. Returns the smaller
     * ratio of the outer dimension to inner dimension.
     * @return {number} ratio
     */
    updateViewport() {
        var inputWidth, inputHeight;

        inputWidth = this.state.cropWidth;
        inputHeight = this.state.cropHeight;

        // Get lesser ratio of outer dimension to inner dimension
        var ratio = Math.min((this.state.boundaryWidth - 50) / inputWidth, (this.state.boundaryHeight - 50)  / inputHeight);

        console.log(inputWidth * ratio);

        // If ratio < 1, viewport needs to be shrunken to fit
        // Else viewport fits
        this.setState(function() {
            if (ratio < 1) {
                return {
                    viewportWidth: Math.floor(inputWidth * ratio),
                    viewportHeight: Math.floor(inputHeight * ratio)
                }
            }
            else {
                return {
                    viewportWidth: inputWidth,
                    viewportHeight: inputHeight
                }
            }
        });


        return ratio;
    }

    bindCroppie() {
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = this.props.photo.urls.regular + "&client_id=cc78fb913f5d55dc67a375382fe3253b89173e2fe02ccf1b1cd1997e843cb335";

        this.state.croppie.bind({
            url: img.src,
            points: this.state.points,
            orientation: this.state.orientation,
        }).then(function() {
            if (this.state.zoom)
            {
                this.state.croppie.setZoom(0);
                this.setState(function() {
                    return {
                        zoom: false
                    }
                });
            }
            this.setState(function() {
                return {
                    loading: false,
                    cropWidth: img.width,
                    cropHeight: img.height
                }
            });
        }.bind(this));
    }

    createCroppie(id) {
        this.state.croppie = new Croppie(document.getElementById(id), {
            viewport: {width: this.state.viewportWidth, height: this.state.viewportHeight},
            enableOrientation: true,
            showZoomer: false
        });

        this.bindCroppie();
    }

    componentWillMount() {
        // var img = new Image();
        // img.src = 'https://cors-anywhere.herokuapp.com/' + this.props.photo.urls.regular;
        // img.onload = function() {
        //     this.state.cropWidth = img.width;
        //     this.state.cropHeight = img.height;
        // }.bind(this)
        //
        // console.log()
    }

    componentDidMount() {
        var img = new Image();
        img.src = this.props.photo.urls.regular;
        img.onload = function() {
            this.setState(function() {
                return {
                    cropWidth: img.width,
                    cropHeight: img.height
                }
            });

            this.updateBoundary();
            var ratio = this.updateViewport();
            this.createCroppie('image');
        }.bind(this);
    }

    componentDidUpdate() {
        //this.bindCroppie();
    }

    componentWillReceiveProps(nextProps) {
        this.state.croppie.destroy();
        this.setState(function() {
            return {
                loading: true
            }
        });

        var img = new Image();
        img.src = nextProps.photo.urls.regular;
        console.log(img.src);

        img.onload = () => {
            this.setState(function() {
                console.log(img.width);
                return {
                    cropWidth: img.width,
                    cropHeight: img.height,
                    zoom: true
                }
            });

            this.updateBoundary();
            var ratio = this.updateViewport();
            this.createCroppie('image');
        };
    }

    handleChange(name, event) {
        var change = {};
        change[name] = event.target.value;

        this.setState(change);
    }

    render() {
        return (
            <div className='container'>
                {this.state.loading &&
                    <Loading
                        img={this.props.photo.urls.thumb}
                    />
                }

                <div id='image-wrapper'>
                    <div id="image" className="croppie-container"></div>
                </div>

                {/*
                <img
                    id='photo'
                    src={this.props.photo.urls.regular}
                /> */}

                <div id="manipulate-wrapper">
                    <label>{this.props.photo.urls.regular}</label><br />
                    <label>Width</label>
                    <input
                        type="number"
                        min="1"
                        id="width"
                        value={this.state.cropWidth}
                        onChange={this.handleChange.bind(this, 'cropWidth')}
                    />

                    <label>Height</label>
                    <input
                        type="number"
                        min="1"
                        id="height"
                        value={this.state.cropHeight}
                        onChange={this.handleChange.bind(this, 'cropHeight')}
                    />
                </div>


                {/* <!--<label>Width</label>
                <input type="number" min="1" id="width" onchange="changeViewport()"/>

                <label>Rotate</label>
                <button onclick="rotate(-1)">Anti-Clockwise</button>
                <button onclick="rotate(1)">Clockwise</button>

                <label>Quality</label>
                <input type="number" min="0" max="1" step="0.1" id="quality" value="0.9" />

                <label>Generate</label>
                <button onclick="getImage()">Go!</button>
                <button onclick="clearSettings()">Reset</button>
                <button onclick="getPoints()">Points</button><div id="points"></div> -->*/}
            </div>
        );
    }
}

Manipulate.propTypes = {
    photo: PropTypes.object.isRequired
}

module.exports = Manipulate;