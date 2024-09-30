import { useState } from "react";

export default function ToggleLogic() {
  const [selectedOption, setSelectedOption] = useState<number>();

  return {
    selectedOption,
    setSelectedOption,
  };
}
