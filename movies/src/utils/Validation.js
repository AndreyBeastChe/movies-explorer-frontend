import React from "react";
import { useCallback } from "react";

export default function Validation() {
  const [isValid, setIsValid] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [values, setValues] = React.useState({});

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  return { values, handleChange, errors, isValid, resetForm, setIsValid };
}
