import { useField } from "formik";
import { forwardRef } from "react";
import FormikDebugger from "../../helper/FormikDebugger";

const FileInput = forwardRef(({ label, onImageSelected, ...props }, ref) => {
  const [, meta, helpers] = useField(props.name); // Don't use field.value

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onImageSelected(reader.result); // You handle the image preview
        // helpers.setValue(file);        // Set the file in Formik state
      };
    }
  };

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input
        type="file"
        ref={ref}
        name={props.name}
        onChange={handleChange}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      <FormikDebugger />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
});

export default FileInput;
