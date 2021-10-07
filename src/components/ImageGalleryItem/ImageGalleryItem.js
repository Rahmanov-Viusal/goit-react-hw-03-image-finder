import PropTypes from "prop-types";
import { Component } from "react";
import s from "./ImageGalleryItem.module.css";

class ImageGalleryItem extends Component {
  handleClickImage = e => {
    this.props.openModal(e.target.dataset.large);
  };

  render() {
    const { webformatURL, largeImageURL, tags = "image" } = this.props;

    return (
      <li className={s.Item}>
        <img
          onClick={this.handleClickImage}
          src={webformatURL}
          alt={tags}
          className={s.Image}
          data-large={largeImageURL}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
