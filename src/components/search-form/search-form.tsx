import React, { useCallback, useState } from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

import { FormModal } from "../form-modal";
import { AdjacentNodesAPIResponseType, HomeOptionsType } from "../../types";
import { options } from "./static";
import { fetchAdjacentNodes } from "../../utils";
import { ErrorAlert } from "../alerts";

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
  const [error, setError] = useState(false);

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
      try {
        const response = await fetchAdjacentNodes(long, lat, homeOptions);
        if (response && homeOptions) {
          handleResponse(response, homeOptions);
          handleClose();
        }
      } catch (e) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      }

      setLoading(false);
    },
    [homeOptions, lat, long, handleResponse, setLoading, handleClose]
  );

  return (
    <>
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
        {error && <ErrorAlert msg="There was an error fetching data!" />}
        {options.map(({ id, label, options }) => (
          <FormControl marginTop={4} id={id} isRequired>
            <FormLabel>{label}</FormLabel>
            <Select onChange={updateHomeOptions} placeholder="Select">
              {options}
            </Select>
          </FormControl>
        ))}
      </FormModal>
    </>
  );
};

const MemoSearchForm = React.memo(SearchForm);
export { MemoSearchForm as SearchForm };
export default MemoSearchForm;
