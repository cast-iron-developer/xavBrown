import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteStory } from '../../actions/story';

const Story = ({
  deleteStory,
  auth,
  story: { _id, owner, title, date, slug },
  showActions
}) => {
  return (
    <div className="content">
      <div className="inner">
        <Link to={`/stories/${slug}`}>
          {title}
        </Link>
      </div>
    </div>
  )
}

Story.defaultProps = {
  showActions: true
};

Story.propTypes = {
  story: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteStory: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {deleteStory}
) (Story);