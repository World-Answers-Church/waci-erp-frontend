import { Dialog } from "primereact/dialog";
import { Messages } from "primereact/messages";
import { ReactNode, useEffect, useRef, useState } from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { FormFieldTypes } from "../app_utils/constants/FormFieldTypes";
import { getFormFieldComponent, validateEmptyField } from "../app_utils/components/FormFieldTemplates";
import { accountLabelTemplate, formatString } from "../app_utils/utils/Utils";
import { MISSING_FORM_INPUT_MESSAGE } from "../app_utils/constants/ErrorMessages";
import { CSS_COL_12, CSS_COL_6, MAXIMUM_RECORDS_PER_PAGE } from "../app_utils/constants/Constants";
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
  const [physicalAddress, setPhysicalAddress] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [genders, setGenders] = useState<string | null>(null);

  const [isValidFirstNameHint, setIsValidFirstNameHint] = useState<string | null>(null);
  const [isValidLastNameHint, setIsValidLastNameHint] = useState<string | null>(null);
  const [isValidPhoneHint, setIsValidPhoneHint] = useState<string | null>(null);
  const [isValidPhysicalAddressHint, setIsValidPhysicalAddressHint] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const message = useRef<any>();

  /**
   * This hook is called when the object is changed. This happens
   * in the parent view when the is changed
   */
  useEffect(() => {
    populateForm(props?.memberObject);
    fetchGendersFromServer();
  }, [props?.memberObject]);

  /**
   * This clears the form by setting form values to null
   */
  const clearForm = () => {
    populateForm(null);
  };
  const fetchGendersFromServer = () => {
    new BaseApiServiceImpl("/api/v1/lookups/genders")
      .getRequestWithJsonResponse({})
      .then(async (response) => {
        setGenders(response?.records);
      })
      .catch((error) => {
        MessageUtils.showErrorMessage(message, error.message);
      });
  };

  const populateForm = (dataObject: any) => {
    setRecordId(dataObject?.id);
    setFirstName(dataObject?.firstName);
    setLastName(dataObject?.lastName);
    setPhoneNumber(dataObject?.phoneNumber);
    setPhysicalAddress(dataObject?.physicalAddress);
  };

  /**
   * This is a list of member form fields
   */
  let memberFormFields: any = [
    {
      type: FormFieldTypes.TEXT.toString(),
      label: "First Name",
      value: firstName,
      onChange: setFirstName,
      setHint: setIsValidFirstNameHint,
      isValidHint: isValidFirstNameHint,
      validateFieldFn: validateEmptyField,
      width: CSS_COL_6,
    },
    {
      type: FormFieldTypes.TEXT.toString(),
      label: "Last Name",
      value: lastName,
      onChange: setLastName,
      setHint: setIsValidLastNameHint,
      isValidHint: isValidLastNameHint,
      validateFieldFn: validateEmptyField,
      width: CSS_COL_6,
    },

    {
      type: FormFieldTypes.TEXT.toString(),
      label: "Phone number",
      value: phoneNumber,
      onChange: setPhoneNumber,
      setHint: setIsValidPhoneHint,
      isValidHint: isValidPhoneHint,
      validateFieldFn: validateEmptyField,
      width: CSS_COL_6,
    },
    {
      type: FormFieldTypes.DROPDOWN.toString(),
      label: "Gender",
      value: gender,
      onChange: setGender,
      options: genders,
      optionValue: "id",
      optionLabel: "name",
      width: CSS_COL_6,
    },
    {
      type: FormFieldTypes.TEXT.toString(),
      label: "Physical Address",
      value: physicalAddress,
      onChange: setPhysicalAddress,
      setHint: setIsValidPhysicalAddressHint,
      isValidHint: isValidPhysicalAddressHint,
      validateFieldFn: validateEmptyField,
      width: CSS_COL_12,
    },
  ];

  /**
   * This loops through the member object fields array to create the fields elements for
   * display
   */
  let memberFields = memberFormFields.map((memberObjectField: any) => {
    return getFormFieldComponent(memberObjectField);
  });

  /**
   * This clears the hint messages
   */
  const clearHints = () => {
    memberFormFields.forEach((formField: any) => {
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

    memberFormFields.forEach((formField: any) => {
      if (formField.setHint && (formField.value === null || formField.value === "" || formField.value === undefined)) {
        isFormValid = false;
        formField.setHint(formatString(MISSING_FORM_INPUT_MESSAGE, formField.label));
      }
    });

    return isFormValid;
  };

  /**
   * This submits a save member request to the backoffice
   */
  const saveMember = () => {
    let memberData: any = {
      id: recordId,
      firstName,
      lastName,
      salutationId: 1,
      middleName: "",
      physicalAddress: physicalAddress,
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
        .postRequestWithJsonResponse(memberData)
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
  const memberDetailsDialogFooter = (
    <>
      <Button label={labels.LABEL_CANCEL} icon={PrimeIcons.TIMES} className="p-button-text" onClick={closeDialog} />
      <Button label={labels.LABEL_SAVE} icon={PrimeIcons.SAVE} className="p-button-secondary" onClick={saveMember} loading={isSaving} />
    </>
  );

  return (
    <Dialog minX={200} visible={props.isOpen} header={"Create member form"} footer={memberDetailsDialogFooter} modal className="p-fluid" onHide={closeDialog} style={{ width: "50vw" }}>
      <Messages ref={message} />
      <div className="grid">
        <div className="col-12">
          <Messages ref={message} style={{ width: "100%" }} />
        </div>
        {memberFields}
      </div>
    </Dialog>
  );
};

export default MemberFormDialogView;
