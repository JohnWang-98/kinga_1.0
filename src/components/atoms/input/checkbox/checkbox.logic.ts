import { useState } from 'react';

export default function CheckboxLogic() {
  const [checked, setChecked] = useState(false);

  return {
    checked,
    setChecked,
  };
}
