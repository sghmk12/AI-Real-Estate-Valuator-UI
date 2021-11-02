import React from "react";

interface AmenitiesPanelProps {
}

const AmenitiesPanel: React.FC<AmenitiesPanelProps> = (props) => {

  return (
    <>
      <p>Coming Soon!</p>
    </>
  );
};

const MemoAmenitiesPanel = React.memo(AmenitiesPanel);
export { MemoAmenitiesPanel as AmenitiesPanel };
export default MemoAmenitiesPanel;