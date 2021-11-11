import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  ModalContent,
  Heading,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { ImgCarousel, PropertyInfoPanel, AmenitiesPanel } from "./components";
import "./property-modal.css";
import { HomeOptionsType, AmenitiesAPIResponseType } from "../../types";
import { fetchAmenities } from "../../utils";

interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerText: React.ReactNode | string;
  images: string[];
  loadingimageIDs: boolean;
  propertyInfo: HomeOptionsType;
  primary: boolean;
  propertyID: string;
  amenities?: AmenitiesAPIResponseType;
  updateAmenities: (
    propertyID: string,
    amenities: AmenitiesAPIResponseType
  ) => void;
}

const PropertyModal: React.FC<PropertyModalProps> = (
  props: PropertyModalProps
) => {
  const {
    isOpen,
    onClose,
    headerText,
    images,
    loadingimageIDs,
    propertyInfo,
    primary,
    propertyID,
    amenities: cachedAmenities,
    updateAmenities,
  } = props;

  const [modal, setModal] = useState<HTMLElement | null>(null);
  const [amenitiesLoading, setAmenitiesLoading] = useState<boolean>(false);
  const [amenities, setAmenities] = useState<
    AmenitiesAPIResponseType | undefined
  >();

  useEffect(() => {
    // HackFix to set opacity to 1
    if (modal) {
      modal.style.opacity = "1";
    }
  });

  const modalRef = useCallback(
    (node: HTMLElement | null) => {
      if (node !== null) {
        setModal(node);
      }
    },
    [setModal]
  );

  const handleAmenitiesTabClick = useCallback(async () => {
    if (!cachedAmenities) {
      setAmenitiesLoading(true);
      const res = await fetchAmenities(propertyID, updateAmenities);
      setAmenities(res);
      setAmenitiesLoading(false);
    }
  }, [propertyID, cachedAmenities, updateAmenities]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent ref={modalRef}>
        <ModalCloseButton className="modal-close" />
        <ModalHeader
          padding={0}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {loadingimageIDs ? (
            <Spinner size="xl" style={{ margin: "50px auto" }} />
          ) : (
            <ImgCarousel images={images} />
          )}
          <Heading size="lg" style={{ padding: "24px" }}>
            {headerText}
          </Heading>
        </ModalHeader>
        <ModalBody pb={6}>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Property Info</Tab>
              <Tab onClick={handleAmenitiesTabClick}>Ameneties</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <PropertyInfoPanel
                  propertyInfo={propertyInfo}
                  primary={primary}
                />
              </TabPanel>
              <TabPanel>
                <AmenitiesPanel
                  loading={!amenities || amenitiesLoading}
                  amenityData={amenities ?? {}}
                  handleViewMap={() => console.log("hello")}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const MemoPropertyModal = React.memo(PropertyModal);
export { MemoPropertyModal as PropertyModal };
export default MemoPropertyModal;
