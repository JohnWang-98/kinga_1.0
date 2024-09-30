import { useState } from "react";

export default function DecoyAppLogic() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return {
    setSelectedOption,
    selectedOption,
  };
}
