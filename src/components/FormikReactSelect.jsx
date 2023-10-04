// components/FormikReactSelect.tsx
import { Label } from "@mui/icons-material";
import { useField, useFormikContext } from "formik";
import React from "react";
import Select, { StylesConfig } from "react-select";

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "#FEE3A3", marginTop: 10, }),
  option: (styles) => ({
    ...styles,
    backgroundColor: "#191F45",
    margin: 5,
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  menu: (provided) => ({ ...provided, zIndex: 9999, margin: 10 }),
  placeholder: (styles) => ({ ...styles, color: "#191F45" }),
  singleValue: (styles) => ({ ...styles, color: "#191F45" }),
};

const FormikReactSelect = (props) => {
  const { name, data, placeholder,val,disabled,identi, ...restProps } = props;
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  //flatten the options so that it will be easier to find the value
  const flattenedOptions = props.options?.flatMap((o) => {
    const isNotGrouped = "value" in o;
    if (isNotGrouped) {
      return o;
    } else {
      return o.options;
    }
  });
  const options = data.map((e) => {
    if(identi){
      return {
        label: e.ID,
        value: e._id,
      };
    }
    else if(val){
      return {
        label: e.name,
        value: e.name,
      };
    }
    else{
    return {
      label: e.name,
      value: e._id,
    };
  }
  });
  //get the value using flattenedOptions and field.value
  const value = flattenedOptions?.filter((o) => {
    const isArrayValue = Array.isArray(field.value);

    if (isArrayValue) {
      const values = field.value;
      return values.includes(o.value);
    } else {
      return field.value === o.value;
    }
  });

  return (
    <Select
      {...restProps}
      isDisabled={props.disabled?props.disabled:false}
      options={options}
      placeholder={<div>{placeholder}</div>}
      value={value}
      styles={colourStyles}
      onChange={(val) => {
        const _val = val;
        const isArray = Array.isArray(_val);
        if (isArray) {
          const values = _val.map((o) => o.value);
          setFieldValue(name, values);
        } else {
          setFieldValue(name, _val.value);
        }
      }}
    />
  );
};

export default FormikReactSelect;
