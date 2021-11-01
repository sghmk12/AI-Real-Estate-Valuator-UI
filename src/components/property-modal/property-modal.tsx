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
  TabPanel
} from "@chakra-ui/react";
import { ImgCarousel } from "./components";
import "./property-modal.css";

interface PropertyModalProps {
  isOpen: boolean,
  onClose: () => void,
  headerText: React.ReactNode | string,
  children: React.ReactNode | string,
  images: string[],
  loadingImageIds: boolean
}

const PropertyModal: React.FC<PropertyModalProps> = (
  props: PropertyModalProps
) => {
  const {
    isOpen,
    onClose,
    headerText,
    children,
    images,
    loadingImageIds
  } = props;

  const [modal, setModal] = useState<HTMLElement | null>(null);

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent ref={modalRef}>
        <ModalCloseButton className="modal-close" />
        <ModalHeader padding={0} style={{display: "flex", flexDirection: "column"}}>
          {loadingImageIds ? <Spinner size="xl" style={{margin: "50px auto"}}/> : <ImgCarousel images={images} />}
          <Heading size="lg" style={{ padding: "24px" }}>
            {headerText}
          </Heading>
        </ModalHeader>
        <ModalBody pb={6}>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Property Info</Tab>
              <Tab>Ameneties</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {children}
              </TabPanel>
              <TabPanel>
                <p>Coming Soon!</p>
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
