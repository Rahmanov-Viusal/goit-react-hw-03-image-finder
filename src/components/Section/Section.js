import React from "react";
import s from "./Section.module.css";

const Section = ({ children }) => {
  return <section className={s.Gallery}>{children}</section>;
};

export default Section;
