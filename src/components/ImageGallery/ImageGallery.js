import React, { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem";
import s from "./ImageGallery.module.css";

export class ImageGallery extends Component {
  render() {
    const { images, openModal } = this.props;
    return (
      <ul className={s.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            image={webformatURL}
            imageInModal={largeImageURL}
            description={tags}
            openModal={openModal}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
