import React, { useState } from "react";
import Select, { AriaOnFocus } from "react-select";

export const CustomSelectAccount = ({ name, data, value, onChange, sview = false }) => {
  const [ariaFocusMessage, setAriaFocusMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const style = {
    blockquote: {
      fontStyle: "italic",
      fontSize: ".75rem",
      margin: "1rem 0",
    },
    label: {
      fontSize: ".75rem",
      fontWeight: "bold",
      lineHeight: 2,
    },
  };

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  const renderFilter=(e)=>{
    const selectted = []

    e.map(r=>{
      selectted.push({
        ...r,
        label: `${r.label} - ${r.value} `
      })
    })

    return selectted
  }

  return (
      <Select
        aria-labelledby="aria-label"
        autoFocus
        // menuIsOpen
        backspaceRemovesValue={false}
        // controlShouldRenderValue={false}
        hideSelectedOptions={false}
        placeholder="Search..."
        // ariaLiveMessages={{
        //   onFocus,
        // }}
        
        inputId="aria-example-input"
        name="aria-live-color"
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        options={sview ? renderFilter(data) : data}
        
        onChange={(e) =>
          onChange({
            target: {
              name: name,
              value: e,
            },
          })
        }
        value={value}
      />
  );
};
