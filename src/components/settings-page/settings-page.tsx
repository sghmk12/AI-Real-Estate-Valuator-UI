import React, { useCallback, useState, useEffect } from "react";
import { GearFill } from "react-bootstrap-icons";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { FormModal } from "../form-modal";
import { ErrorAlert } from "../alerts";
import { Error } from "../../types";
import { options } from "./static";
import defaultSettings from "./static/default-settings.json"

const STORAGE_KEY = "APP_SETTINGS"

interface SettingsProps {
    modalOpen: boolean;
    handleModalClose: () => void;
    onSetSettings?: (settings: any) => void;
}

const SettingsPage: React.FC<SettingsProps> = (props) => {
    const { modalOpen, handleModalClose, onSetSettings } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [settings, setSettings] = useState<any>(defaultSettings);
    const [error, setError] = useState<Error>();

    useEffect(() =>{
        try{
            const data = localStorage.getItem(STORAGE_KEY);
            if(data){
                const parsedData = JSON.parse(data); 
                setSettings(parsedData);
                if(onSetSettings) onSetSettings(parsedData)
            }
        }catch(e){
            setError({msg: "Error retreiving previous settings"});
        }
    },[]);

    const handleSaveSettings = useCallback(
        async (event: any) => {
            event.preventDefault();
            setLoading(true);
            try{
                localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
            } catch (e) {
                setError({msg:"Sorry, we could not save your settings"});
            }
            setLoading(false);
            handleModalClose();
        },
        []
    );

    const handleSettingsClose = useCallback(() => {
        handleModalClose();
    }, []);

    const updateSettings = useCallback((event) => {
        setSettings((prev : any) => {
            return prev? {
                 ...prev,
                 [event.target.id]: event.target.value
            } : {
                ...defaultSettings,
                [event.target.id]: event.target.value
            };
        })
    }, []);

    return (
        <FormModal
            isOpen={modalOpen}
            onClose={handleSettingsClose}
            headerText="Settings"
            saveText="Save"
            cancelText="Cancel"
            onSave={handleSaveSettings}
            disabled={false}
            loading={loading}
        >
            {error && <ErrorAlert msg={error.msg || "There was an error getting your settings!"} />}
            {options.map(({ id, label, options }) => (
            <FormControl marginTop={4} id={id} isRequired>
                <FormLabel>{label}</FormLabel>
                <Select value={settings[id]} onChange={updateSettings}>
                {options}
                </Select>
            </FormControl>
            ))}
        </FormModal>
    );
};

const MemoSettings = React.memo(SettingsPage);
export { MemoSettings as SettingsPage };
export default MemoSettings;