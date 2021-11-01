import React, { useCallback, useState } from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

import { FormModal } from "../form-modal";
import { AdjacentNodesAPIResponseType, HomeOptionsType } from "../../types";
import { options } from "./static";
import { fetchAdjacentNodes } from "../../utils";

interface SearchFormProps {
  modalOpen: boolean;
  handleModalClose: () => void;
  lat: number;
  long: number;
  handleResponse: (
    response: AdjacentNodesAPIResponseType,
    req: HomeOptionsType
  ) => void;
}

const SearchForm: React.FC<SearchFormProps> = (props) => {
  const { modalOpen, handleModalClose, lat, long, handleResponse } = props;
  const [homeOptions, setHomeOptions] = useState<HomeOptionsType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updateHomeOptions = useCallback(
    (e) => {
      setHomeOptions((prev) => {
        if (prev) {
          return { ...prev, [e.target.id]: e.target.value };
        }
        return { [e.target.id]: e.target.value } as any;
      });
    },
    [setHomeOptions]
  );

  const handleClose = useCallback(() => {
    setHomeOptions(null);
    handleModalClose();
  }, [handleModalClose, setHomeOptions]);

  const handleSave = useCallback(
    async (event: any) => {
      event.preventDefault();
      setLoading(true);
      const response = await fetchAdjacentNodes(long, lat, homeOptions);
      console.log(response);
      if (response && homeOptions) {
        handleResponse(response, homeOptions);
        handleClose();
      }
      setLoading(false);
    },
    [homeOptions, lat, long, handleResponse, setLoading, handleClose]
  );

  return (
    <FormModal
      isOpen={modalOpen}
      onClose={handleClose}
      headerText="Property Information"
      saveText="Save"
      cancelText="Cancel"
      onSave={handleSave}
      disabled={
        homeOptions == null ||
        Object.entries(homeOptions).filter(([_key, value]) => value !== "")
          .length !== 6
      }
      loading={loading}
    >
      {options.map(({ id, label, options }) => (
        <FormControl marginTop={4} id={id} isRequired>
          <FormLabel>{label}</FormLabel>
          <Select onChange={updateHomeOptions} placeholder="Select">{options}</Select>
        </FormControl>
      ))}
    </FormModal>
  );
};

const MemoSearchForm = React.memo(SearchForm);
export { MemoSearchForm as SearchForm };
export default MemoSearchForm;
