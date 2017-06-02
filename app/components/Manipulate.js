var React = require('react');
var PropTypes = require('prop-types');

class Manipulate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orientation: 1,
            points: [0, 0, this.props.photo.width, this.props.photo.height],
            zoom: false,
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
        const UI_HEIGHT = 100;

        if (typeof window.innerWidth !== undefined) {
            this.state.boundaryWidth = window.innerWidth;
            this.state.boundaryHeight = window.innerHeight - UI_HEIGHT;
        }
    }

    /**
     * Updates the limits for the image within the boundary. Returns the smaller
     * ratio of the outer dimension to inner dimension.
     * @return {number} ratio
     */
    updateViewport() {
        var inputWidth = this.state.cropWidth; //document.getElementById('width').value;
        var inputHeight = this.state.cropHeight; //document.getElementById('height').value;

        // Get lesser ratio of outer dimension to inner dimension
        var ratio = Math.min((this.state.boundaryWidth - 50) / inputWidth, (this.state.boundaryHeight - 50)  / inputHeight);

        // If ratio < 1, viewport needs to be shrunken to fit
        // Else viewport fits
        if (ratio < 1) {
            this.state.viewportWidth = Math.floor(inputWidth * ratio);
            this.state.viewportHeight = Math.floor(inputHeight * ratio);
        }
        else {
            this.state.viewportWidth = inputWidth;
            this.state.viewportHeight = inputHeight;
        }

        return ratio;
    }

    bindCroppie(id) {
        var el = document.getElementById(id);

        var croppie = new Croppie(el, {
            viewport: {width: this.state.viewportWidth, height: this.state.viewportHeight},
            boundary: {width: this.state.boundaryWidth, height: this.state.boundaryHeight},
            enableOrientation: true
        });

        croppie.bind({
            url: 'https://cors-anywhere.herokuapp.com/' + this.props.photo.urls.raw,
            points: this.state.points,
            orientation: this.state.orientation,
        }).then(function() {
            if (this.state.zoom)
            {
                croppie.setZoom(0);
                this.state.zoom = false;
            }
        });
    }

    componentWillMount() {
         this.state.cropWidth = this.props.photo.width;
         this.state.cropHeight = this.props.photo.height;
    }

    componentDidMount() {
        const photoId = 'image';
        this.updateBoundary();
        this.updateViewport();

        this.bindCroppie(photoId);
    }

    handleChange(name, event) {
        var change = {};
        change[name] = event.target.value;

        this.setState(change);
    }

    render() {
        return (
            <div className='container'>
                <div id="image" className="croppie-container"></div>
                {/* <img
                    id='photo'
                    src={this.props.photo.urls.regular}
                /> */}


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