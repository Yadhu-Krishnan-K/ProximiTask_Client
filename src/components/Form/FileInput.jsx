// components/form/FileInput.jsx
import { useField } from "formik";
import { forwardRef } from "react";

const FileInput = forwardRef(({ label, onImageSelected, ...props }, ref) => {
  const [field, meta, helpers] = useField(props);
  const handleChange = (e) => {
    if(e.target?.files.length>0){
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = function(e){
        onImageSelected(reader.result)
      }
    }
  }
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input
        type="file"
        ref={ref}
        {...field}
        {...props}
        onChange={handleChange}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
});

export default FileInput;
