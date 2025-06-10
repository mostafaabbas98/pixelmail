import { useState } from "react";

export const useUrlParams = () => {
  const [params, setParams] = useState(
    () => new URLSearchParams(window.location.search)
  );

  const updateParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set(key, value);
    window.history.pushState({}, "", `?${newParams.toString()}`);
    setParams(newParams);
  };

  const removeParam = (key: string) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.delete(key);
    window.history.pushState({}, "", `?${newParams.toString()}`);
    setParams(newParams);
  };

  return { params, updateParams, removeParam };
};
