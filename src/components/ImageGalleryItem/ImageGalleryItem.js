import React, { Component } from "react";
import s from "./ImageGalleryItem.module.css";

export class ImageGalleryItem extends Component {
  handleClickImage = e => {
    this.props.openModal(e.target.dataset.modal);
  };
  render() {
    const { image, imageInModal, description } = this.props;
    return (
      <li className={s.ImageGalleryItem} onClick={this.handleClickImage}>
        <img
          src={image}
          alt={description}
          data-modal={imageInModal}
          className="ImageGalleryItem-image"
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
