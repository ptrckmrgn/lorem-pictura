var React = require('react');
var PropTypes = require('prop-types');

function Photo(props) {
    return (
        <div id='photo-wrapper'>
            <img
                id='photo'
                src={props.photo.urls.full}
            />
        </div>
    )
}

Photo.propTypes = {
    photo: PropTypes.object.isRequired
}

module.exports = Photo;