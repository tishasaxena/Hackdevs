import React from "react";
import {useForm} from "react-hook-form";
function Report() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {

  };

  return (
    <div>
      <h1>Report an Issue</h1>
      {/* Add your report form or content here */}
    </div>
  );
}
export default Report;