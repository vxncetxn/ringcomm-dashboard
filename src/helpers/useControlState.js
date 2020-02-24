import { useState } from "react";

const useControlState = defaultVal => {
  const [value, setValue] = useState(defaultVal);
  const [error, setError] = useState("");

  return [value, setValue, error, setError];
};

export default useControlState;
