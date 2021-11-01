import React from "react";
import { HouseDoorFill } from "react-bootstrap-icons";
import { OverlayView } from "@react-google-maps/api";
import { MapNodeType } from "../../../types";
import { Tooltip } from "@chakra-ui/react"

const HomeIcon: React.FC = () => (
  <HouseDoorFill color="white" size={18} className="centered" />
);

const getPixelPositionOffset = (width: number, height: number) => ({
  x: -(width / 2),
  y: -(height / 2),
});


interface MapNodeProps {
  onClick: (node: MapNodeType) => void,
  node: MapNodeType
}

const MapNode: React.FC<MapNodeProps> = (props) => {
  const { onClick, node } = props;
  const {location, primary} = node;


  return (
    <OverlayView
      position={location}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <Tooltip label={`Price: $${Number(node.homeOptions.price)?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} CAD`}>
        <div
          className={`circleBase ${
            primary ? "circleColourPrimary" : "circleColourSecondary"
          }`}
          onClick={() => onClick(node)}
          tabIndex={0}
        >
          <HomeIcon />
        </div>
      </Tooltip>
    </OverlayView>
  );
};

const MemoMapNode = React.memo(MapNode);
export { MemoMapNode as MapNode };
export default MemoMapNode;
