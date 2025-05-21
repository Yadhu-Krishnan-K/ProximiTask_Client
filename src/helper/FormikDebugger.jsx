import { useFormikContext } from "formik";
import { useEffect } from "react";

const FormikDebugger = () => {
  const { values } = useFormikContext();

  useEffect(() => {
    console.log("Formik values:", values);
  }, [values]);

  return null; // or you can return a <pre>{JSON.stringify(values, null, 2)}</pre>
};

export default FormikDebugger;
