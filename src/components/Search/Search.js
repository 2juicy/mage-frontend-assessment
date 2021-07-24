import React from "react";

export default function Search() {
  const filterInput = input => {
    let newColors = [];
    colors.forEach(color => {
      if (
        color.name
          .toLowerCase()
          .replace(/\s/g, "")
          .indexOf(input.toLowerCase().replace(/\s/g, "")) > -1
      ) {
        newColors.push(color);
      }
    });
    setFilter(newColors);
  };

  return <div></div>;
}
