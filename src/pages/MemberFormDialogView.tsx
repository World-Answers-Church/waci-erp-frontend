import { Dialog } from "primereact/dialog";
import { Messages } from "primereact/messages";
import { ReactNode, useEffect, useRef, useState } from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { FormFieldTypes } from "../app_utils/constants/FormFieldTypes";
import { getFormFieldComponent, validateEmptyField } from "../app_utils/components/FormFieldTemplates";
import { accountLabelTemplate, formatString } from "../app_utils/utils/Utils";
import { MISSING_FORM_INPUT_MESSAGE } from "../app_utils/constants/ErrorMessages";
import { MAXIMUM_RECORDS_PER_PAGE } from "../app_utils/constants/Constants";
import { BaseApiServiceImpl } from "../app_utils/api/BaseApiServiceImpl";
import { MessageUtils } from "../app_utils/utils/MessageUtils";
import * as labels from "../app_utils/constants/Labels";

interface ModalType {
  children?: ReactNode;
  messageRef?: any;
  memberObject: any;
  reloadFn: any;
  isOpen: boolean;
  toggle: () => void;
}

const MemberFormDialogView = (props: ModalType) => {
  const [recordId, setRecordId] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [isValidFirstNameHint, setIsValidFirstNameHint] = useState<string | null>(null);

  const [isValidLastNameHint, setIsValidLastNameHint] = useState<string | null>(null);
  const [isValidPhoneHint, setIsValidPhoneHint] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const message = useRef<any>();

  /**
   * This hook is called when the object is changed. This happens
   * in the parent view when the is changed
   */
  useEffect(() => {
    populateForm(props?.memberObject);
  }, [props?.memberObject]);

  /**
   * This clears the form by setting form values to null
   */
  const clearForm = () => {
    populateForm(null);
  };

  const populateForm = (dataObject: any) => {
    setRecordId(dataObject?.id);
    setFirstName(dataObject?.firstName);
    setLastName(dataObject?.lastName);
    setPhoneNumber(dataObject?.phoneNumber);
  };

  /**
   * This is a list of county form fields
   */
  let countyFormFields: any = [
    {
      type: FormFieldTypes.TEXT.toString(),
      label: "First Name",
      value: firstName,
      onChange: setFirstName,
      setHint: setIsValidFirstNameHint,
      isValidHint: isValidFirstNameHint,
      validateFieldFn: validateEmptyField,
    },
    {
      type: FormFieldTypes.TEXT.toString(),
      label: "Last Name",
      value: lastName,
      onChange: setLastName,
      setHint: setIsValidLastNameHint,
      isValidHint: isValidLastNameHint,
      validateFieldFn: validateEmptyField,
    },

    {
      type: FormFieldTypes.TEXT.toString(),
      label: "Phone number",
      value: phoneNumber,
      onChange: setPhoneNumber,
      setHint: setIsValidPhoneHint,
      isValidHint: isValidPhoneHint,
      validateFieldFn: validateEmptyField,
    },
  ];

  /**
   * This loops through the county object fields array to create the fields elements for
   * display
   */
  let countyFields = countyFormFields.map((countyObjectField: any) => {
    return getFormFieldComponent(countyObjectField);
  });

  /**
   * This clears the hint messages
   */
  const clearHints = () => {
    countyFormFields.forEach((formField: any) => {
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

    countyFormFields.forEach((formField: any) => {
      if (formField.setHint && (formField.value === null || formField.value === "" || formField.value === undefined)) {
        isFormValid = false;
        formField.setHint(formatString(MISSING_FORM_INPUT_MESSAGE, formField.label));
      }
    });

    return isFormValid;
  };

  /**
   * This submits a save county request to the backoffice
   */
  const saveMember = () => {
    let countyData: any = {
      id: recordId,
      firstName,
      lastName,
      salutationId: 1,
      middleName: "",
      physicalAddress: "",
      phoneNumber,
      emailAddress: "",
      yearJoined: 2010,
      occupationId: 5,
      nin: "",
      imageUrl: "",
    };

    if (validateForm()) {
      setIsSaving(true);
      new BaseApiServiceImpl("/api/v1/members")
        .postRequestWithJsonResponse(countyData)
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
  const countyDetailsDialogFooter = (
    <>
      <Button label={labels.LABEL_CANCEL} icon={PrimeIcons.TIMES} className="p-button-text" onClick={closeDialog} />
      <Button label={labels.LABEL_SAVE} icon={PrimeIcons.SAVE} className="p-button-secondary" onClick={saveMember} loading={isSaving} />
    </>
  );

  return (
    <Dialog visible={props.isOpen} header={"Create member form"} footer={countyDetailsDialogFooter} modal className="p-fluid" onHide={closeDialog} style={{ width: "50vw" }}>
      <Messages ref={message} />
      <div className="grid">
        <div className="col-12">
          <Messages ref={message} style={{ width: "100%" }} />
        </div>
        {countyFields}
      </div>
    </Dialog>
  );
};

export default MemberFormDialogView;
