import { useState } from "react";

export const useField = type => {
  const [value, setValue] = useState("");

  const onChange = event => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset
  };
};

export const useMessage = () => {
  const [value, setValue] = useState("");

  const onChange = message => {
    setValue(message);
  };

  return {
    value,
    onChange
  };
};
