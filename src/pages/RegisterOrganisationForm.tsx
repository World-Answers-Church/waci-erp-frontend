import { Messages } from "primereact/messages";
import { useEffect, useRef, useState } from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { FormFieldTypes } from "../app_utils/constants/FormFieldTypes";
import {
  getFormFieldComponent,
  validateEmptyField,
} from "../app_utils/components/FormFieldTemplates";
import { formatString } from "../app_utils/utils/Utils";
import { MISSING_FORM_INPUT_MESSAGE } from "../app_utils/constants/ErrorMessages";
import {
  CSS_COL_6,
} from "../app_utils/constants/Constants";
import { BaseApiServiceImpl } from "../app_utils/api/BaseApiServiceImpl";
import { MessageUtils } from "../app_utils/utils/MessageUtils";
import * as labels from "../app_utils/constants/Labels";

import { useHistory } from "react-router-dom";
import { LOGIN_ROUTE_PATH } from "../app_utils/route_paths/resolver/PageRoutes";

interface SignUpFormData {
  name: string;
  code: string;
  emailAddress: string;
  categoryName: string;
  categoryId: string;
  website: string;
  physicalAddress: string;
  primaryPhoneNumber: string;
  otherPhoneNumber: string;
  logoUrl: string;
}
const RegisterOrganisationForm = () => {
  const [signUpSuccessfull, setSignUpSuccessfull] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [physicalAddress, setPhysicalAddress] = useState<string>("");
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState<string>("");
  const [otherPhoneNumber, setOtherPhoneNumber] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");

  const [isValidNameHint, setIsValidNameHint] = useState<string | null>(null);
  const [isValidCodeHint, setIsValidCodeHint] = useState<string | null>(null);
  const [isValidEmailHint, setIsValidEmailHint] = useState<string | null>(null);
  const [isValidPhoneHint, setIsValidPhoneHint] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const message = useRef<any>();

  const history = useHistory();
  /**
   * This hook is called when the object is changed. This happens
   * in the parent view when the is changed
   */
  useEffect(() => {
  }, []);

  /**
   * This clears the form by setting form values to null
   */
  const clearForm = () => {
    populateForm(null);
  };
  
  const populateForm = (dataObject: any) => {
    setName(dataObject?.name);
    setCode(dataObject?.code);
    setPrimaryPhoneNumber(dataObject?.primaryPhoneNumber);
    setPhysicalAddress(dataObject?.physicalAddress);
  };

  /**
   * This is a list of organisation form fields
   */
  let organisationFormFields: any = [
    {
      type: FormFieldTypes.TEXT.toString(),
      label: "Church Name",
      value: name,
      onChange: setName,
      setHint: setIsValidNameHint,
      isValidHint: isValidNameHint,
      validateFieldFn: validateEmptyField,
      width: CSS_COL_6,
    },
    {
      type: FormFieldTypes.TEXT.toString(),
      label: "Church Short Name",
      value: code,
      hint:"(3 to 5 characters)",
      onChange: setCode,
      setHint: setIsValidCodeHint,
      isValidHint: isValidCodeHint,
      validateFieldFn: validateEmptyField,
      width: CSS_COL_6,
    },
    {
      type: FormFieldTypes.TEXT.toString(),
      label: "Primary Phone Number",
      value: primaryPhoneNumber,
      onChange: setPrimaryPhoneNumber,
      setHint: setIsValidPhoneHint,
      isValidHint: isValidPhoneHint,
      validateFieldFn: validateEmptyField,
      width: CSS_COL_6,
    },

    {
      type: FormFieldTypes.TEXT.toString(),
      label: "Physical Address",
      value: physicalAddress,
      onChange: setPhysicalAddress,
      width: CSS_COL_6,
    },
    {
      type: FormFieldTypes.TEXT.toString(),
      label: "Email Address",
      value: emailAddress,
      onChange: setEmailAddress,
      setHint: setIsValidEmailHint,
      isValidHint: isValidEmailHint,
      validateFieldFn: validateEmptyField,
      width: CSS_COL_6,
    },
   
    {
      type: FormFieldTypes.TEXT.toString(),
      label: "Website",
      value: website,
      onChange: setWebsite,
      width: CSS_COL_6,
    },
  ];

  /**
   * This loops through the organisation object fields array to create the fields elements for
   * display
   */
  let organisationFields = organisationFormFields.map(
    (organisationObjectField: any) => {
      return getFormFieldComponent(organisationObjectField);
    }
  );

  /**
   * This clears the hint messages
   */
  const clearHints = () => {
    organisationFormFields.forEach((formField: any) => {
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

    organisationFormFields.forEach((formField: any) => {
      if (
        formField.setHint &&
        (formField.value === null ||
          formField.value === "" ||
          formField.value === undefined)
      ) {
        isFormValid = false;
        formField.setHint(
          formatString(MISSING_FORM_INPUT_MESSAGE, formField.label)
        );
      }
    });

    return isFormValid;
  };

  /**
   * This submits a save organisation request to the backoffice
   */
  const saveOrganisation = () => {
    let organisationData: any = {
      name: name,
      primaryPhoneNumber: primaryPhoneNumber,
      emailAddress: emailAddress,
      code: code,
      physicalAddress: physicalAddress,
      otherPhoneNumber: otherPhoneNumber,
      logoUrl: logoUrl,
    };

    if (validateForm()) {
      setIsSaving(true);
      new BaseApiServiceImpl("/api/v1/organisations")
        .postRequestWithJsonResponse(organisationData)
        .then(async (response) => {
          setIsSaving(false);
          setSignUpSuccessfull(true);
          clearForm();
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
    history.goBack();
  };

  /**
   * This is the footer of the modal dialog
   */
  const organisationDetailsDialogFooter = (
    <div className="w-full grid">
      <div className="col-6 pr-1">
        <Button
          label={labels.LABEL_CANCEL}
          icon={PrimeIcons.TIMES}
          className="p-button-outlined w-full"
          onClick={closeDialog}
          loading={isSaving}
        />
      </div>
      <div className="col-6 pl-1">
        <Button
          label={labels.LABEL_SAVE}
          icon={PrimeIcons.SAVE}
          className="p-button-secondary w-full"
          onClick={saveOrganisation}
          loading={isSaving}
        />
      </div>
    </div>
  );

  return (
    <div className="pages-body  flex flex-column grid">
      <div className="col-12 md:col-6 align-self-center mt-auto mb-auto">
        {signUpSuccessfull !== true && (
          <div className="pages-panel card flex flex-column m-5 grid">
            <div className="px-3 py-1">
              <h2>Register Church</h2>
            </div>

            <div className="pages-detail mb-4 px-6">
              Register On our platform
            </div>

            <div className="input-panel flex flex-column px-3 grid"></div>

            <div className="col-12">
              <Messages ref={message} style={{ width: "100%" }} />
            </div>
            <div className="col-12 p-9 align-self-left grid">
              {organisationFields}
              <div className="col-12 w-full">
                {organisationDetailsDialogFooter}
              </div>
            </div>
          </div>
        )}

        {signUpSuccessfull === true && (
          <div className="pages-panel card flex flex-column m-5 grid">
            <div className="px-3 py-1">
              <h2>Register Church</h2>
            </div>

            <div className="pages-detail mb-2 px-1">
           <h1> 🎉</h1>
            </div>

            <div className="input-panel flex flex-column px-3 grid">
              Registration Successfull, please check your email for login credentials.
              <Button className="p-button-text mt-5" label="Proceed to login" onClick={()=>history.replace(LOGIN_ROUTE_PATH)}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterOrganisationForm;
