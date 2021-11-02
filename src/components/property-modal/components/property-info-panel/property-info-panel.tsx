import React from "react";
import { HomeOptionsType } from "../../../../types";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface PropertyInfoPanelProps {
  propertyInfo: HomeOptionsType;
  primary: boolean;
}

const PropertyInfoPanel: React.FC<PropertyInfoPanelProps> = (props) => {
  const { propertyInfo, primary } = props;

  return (
    <>
      {Object.entries(propertyInfo).map(([key, value]) =>
        key === "price" ? (
          <>
            <p>
              <strong>{primary ? "Estimated" : "Sold"} Price: </strong>
              {`$${Number(propertyInfo.price)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")} CAD`}
            </p>
            <br />
          </>
        ) : (
          <>
            <p>
              <strong>{capitalizeFirstLetter(key)}: </strong>
              {value}
            </p>
            <br />
          </>
        )
      )}
    </>
  );
};

const MemoPropertyInfoPanel = React.memo(PropertyInfoPanel);
export { MemoPropertyInfoPanel as PropertyInfoPanel };
export default MemoPropertyInfoPanel;