import { Dialog } from "primereact/dialog";
import { Messages } from "primereact/messages";
import { ReactNode, useEffect, useRef, useState } from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { FormFieldTypes } from "../app_utils/constants/FormFieldTypes";
import { getFormFieldComponent, validateEmptyField } from "../app_utils/components/FormFieldTemplates";
import { formatString } from "../app_utils/utils/Utils";
import { MISSING_FORM_INPUT_MESSAGE } from "../app_utils/constants/ErrorMessages";
import { BaseApiServiceImpl } from "../app_utils/api/BaseApiServiceImpl";
import { MessageUtils } from "../app_utils/utils/MessageUtils";
import * as labels from "../app_utils/constants/Labels";
import { CSS_COL_12, CSS_COL_6, LOOKUP_YPES, MAXIMUM_RECORDS_PER_PAGE, RECORD_STATUSES } from "../app_utils/constants/Constants";

interface ModalType {
  children?: ReactNode;
  messageRef?: any;
  record: any;
  reloadFn: any;
  isOpen: boolean;
  toggle: () => void;
}

const LookupFormDialogView = (props: ModalType) => {
  const [recordId, setRecordId] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [recordStatus, setRecordStatus] = useState<string | null>(null);

  const [isValidValueHint, setIsValidValueHint] = useState<string | null>(null);
  const [isValidDescriptionHint, setIsValidDescriptionHint] = useState<string | null>(null);
  const [isValidTypeHint, setIsValidTypeHint] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const message = useRef<any>();

  /**
   * This hook is called when the object is changed. This happens
   * in the parent view when the is changed
   */
  useEffect(() => {
    populateForm(props?.record);
  }, [props?.record]);

  /**
   * This clears the form by setting form values to null
   */
  const clearForm = () => {
    populateForm(null);
  };

  const populateForm = (dataObject: any) => {
    setRecordId(dataObject?.id);
    setValue(dataObject?.value);
    setDescription(dataObject?.description);
    setRecordStatus(dataObject?.recordStatus);
  };

  /**
   * This is a list of user form fields
   */
  let userFormFields: any = [
    {
      type: FormFieldTypes.TEXT.toString(),
      label: "Value",
      value: value,
      onChange: setValue,
      setHint: setIsValidValueHint,
      isValidHint: isValidValueHint,
      validateFieldFn: validateEmptyField,
      width: CSS_COL_6,
    },
    {
      type: FormFieldTypes.TEXT.toString(),
      label: "Description",
      value: description,
      onChange: setDescription,
      width: CSS_COL_6,
    },

  
    {
      type: FormFieldTypes.DROPDOWN.toString(),
      label: "Type",
      value: type,
      onChange: setType,
      options: LOOKUP_YPES,
      optionValue: "id",
      optionLabel: "name",
      width: CSS_COL_6,
      setHint: setIsValidTypeHint,
      isValidHint: isValidTypeHint,
      validateFieldFn: validateEmptyField,
    },

    {
      type: FormFieldTypes.DROPDOWN.toString(),
      label: "recordStatus",
      value: recordStatus,
      onChange: setRecordStatus,
      options: RECORD_STATUSES,
      optionValue: "id",
      optionLabel: "name",
      width: CSS_COL_6,
    },
  ];

  /**
   * This loops through the user object fields array to create the fields elements for
   * display
   */
  let userFields = userFormFields.map((userObjectField: any) => {
    return getFormFieldComponent(userObjectField);
  });

  /**
   * This clears the hint messages
   */
  const clearHints = () => {
    userFormFields.forEach((formField: any) => {
      if (formField.isValidHint) {
        formField.setHint(null);
      }
    });
  };

  /**
   * This validates the form fields that have isValidHint attributes and sets their corresponding hints if the field validation
   * fails
   * @returns boolean
   */
  const validateForm = () => {
    clearHints();
    let isFormValid: boolean = true;

    userFormFields.forEach((formField: any) => {
      if (formField.setHint && (formField.value === null || formField.value === "" || formField.value === undefined)) {
        isFormValid = false;
        formField.setHint(formatString(MISSING_FORM_INPUT_MESSAGE, formField.label));
      }
    });

    return isFormValid;
  };

  /**
   * This submits a save user request to the backoffice
   */
  const saveUser = () => {
    let userData: any = {
      id: recordId,
      value,
      description,
      recordStatus: recordStatus,
      typeId: type,
    };

    if (validateForm()) {
      setIsSaving(true);
      new BaseApiServiceImpl("/api/v1/lookups/lookup-values")
        .postRequestWithJsonResponse(userData)
        .then(async (response) => {
          setIsSaving(false);
          clearForm();
          MessageUtils.showSuccessMessage(props?.messageRef, labels.LABEL_RECORD_SAVED_SUCCESSFULLY);
          closeDialog();
          props?.reloadFn();
        })
        .catch((error) => {
          setIsSaving(false);
          MessageUtils.showErrorMessage(message, error.message);
        });
    }
  };

  /**
   * This closes the dialog
   */
  const closeDialog = () => {
    props.toggle();
  };

  /**
   * This is the footer of the modal dialog
   */
  const userDetailsDialogFooter = (
    <>
      <Button label={labels.LABEL_CANCEL} icon={PrimeIcons.TIMES} className="p-button-text" onClick={closeDialog} />
      <Button label={labels.LABEL_SAVE} icon={PrimeIcons.SAVE} className="p-button-secondary" onClick={saveUser} loading={isSaving} />
    </>
  );

  return (
    <Dialog visible={props.isOpen} header={"Create lookup value"} footer={userDetailsDialogFooter} modal className="p-fluid" onHide={closeDialog} style={{ width: "50vw" }}>
      <Messages ref={message} />
      <div className="grid">
        <div className="col-12">
          <Messages ref={message} style={{ width: "100%" }} />
        </div>
        {userFields}
      </div>
    </Dialog>
  );
};

export default LookupFormDialogView;
