import { useEffect } from "react";

const useAutosizeTextArea = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef?.current) {
      // Resetting the height to auto to calculate the new height
      textAreaRef.current.style.height = "auto";
      // Set the height based on the scroll height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
