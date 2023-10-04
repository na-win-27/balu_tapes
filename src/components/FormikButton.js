// components/FormikReactSelect.tsx
import { Label } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React from "react";
import Select, { StylesConfig } from "react-select";


const FormikButton = (props) => {
  const { name, data, placeholder,val,disabled,identi, ...restProps } = props;
  const [field] = useField(name);
  const { values,setFieldValue } = useFormikContext();


  return (
    <Button
    variant="contained"
      {...restProps}
      isDisabled={props.disabled?props.disabled:false}
      onClick={() =>{
          const v=values.elastic.map((value, i) =>{
              return {
                  ...value,
                  quantity:values.production
              }
          })
          setFieldValue("elastic",v)
      }}
    >
        Add Production
    </Button> 
  );
};

export default FormikButton;
