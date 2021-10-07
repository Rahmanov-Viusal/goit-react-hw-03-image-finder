import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal";
import Searchbar from "./components/Searchbar";
import pixabayAPI from "./services/services";
import s from "./App.module.css";
import Button from "./components/Button";
import Section from "./components/Section";
import Container from "./components/Container";
import Request from "./components/Request";
import ErrorMessage from "./components/ErrorMessage";

class App extends Component {
  state = {
    query: "",
    images: null,
    page: 1,
    error: null,
    total: null,
    status: "idle",
    showModal: false,
    largeURL: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page, showModal } = this.state;

    if (prevState.query !== query) {
      this.setState({ status: "pending" });

      this.firstFetchImages(query, page);
    }

    if (prevState.page !== page && page !== 1) {
      this.nextFetchImages(query, page);
    }

    if (!showModal && !prevState.showModal) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  firstFetchImages = (query, page) => {
    pixabayAPI.fetchImage(query, page).then(({ hits, total }) => {
      this.setState({ images: hits, total, status: "resolved" });
      if (!total) {
        this.setState({
          error: "Something went wrong! Please, change your request!",
          status: "rejected",
        });
      } else {
        this.setState({ error: null });
      }
    });
  };

  nextFetchImages = (query, page) => {
    pixabayAPI.fetchImage(query, page).then(({ hits }) => {
      this.setState(({ images }) => ({
        images: [...images, ...hits],
      }));
    });
  };
  handleSubmitForm = query => {
    this.setState({ query, page: 1 });
  };

  handleIncrement = () => {
    this.setState({ page: this.state.page + 1 });
  };

  toggleModal = url => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeURL: url,
    }));
  };

  render() {
    const { error, status, total, page, showModal, largeURL } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleSubmitForm} />;
        <Section>
          <Container>
            {status === "idle" && <Request />}
            {status === "rejected" && <ErrorMessage message={error} />}
            {status === "resolved" && (
              <ImageGallery
                images={this.state.images}
                openModal={this.toggleModal}
              />
            )}
            {status === "pending" && (
              <Loader type="Watch" color="#00BFFF" height={80} width={80} />
            )}
            {total - page * 12 > 0 && <Button onClick={this.handleIncrement} />}
          </Container>
        </Section>
        {showModal && (
          <Modal onToggleModal={this.toggleModal}>
            <img src={largeURL} alt="" />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
