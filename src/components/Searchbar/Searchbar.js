import React, { Component } from "react";
import s from "./Searchbar.module.css";

export class Searchbar extends Component {
  state = {
    search: "",
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.search);
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  };
  render() {
    const { search } = this.state;
    return (
      <div>
        <header className={s.Searchbar}>
          <form onSubmit={this.onSubmit} className={s.SearchForm}>
            <button type="submit" className={s.SearchFormButton}>
              <span className={s.SearchFormButtonLabel}>Search</span>
            </button>

            <input
              className={s.SearchFormInput}
              type="text"
              // autocomplete="off"
              // autofocus
              placeholder="Search images and photos"
              value={search}
              onChange={this.handleChange}
              name="search"
            />
          </form>
        </header>
      </div>
    );
  }
}

export default Searchbar;
