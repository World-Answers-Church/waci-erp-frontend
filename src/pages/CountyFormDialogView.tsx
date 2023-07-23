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
  countyObject: any;
  territoryOptions: any;
  reloadFn: any;
  isOpen: boolean;
  toggle: () => void;
}

const CountyFormDialogView = (props: ModalType) => {
  const [recordId, setRecordId] = useState<string | null>(null);
  const [countyName, setCountyName] = useState<string | null>(null);
  const [countyTerritory, setCountyTerritory] = useState<string | null>(null);
  const [chairpersonDateElected, setChairpersonDateElected] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<string | null>(null);
  const [chairpersonAccountId, setChairpersonAccountId] = useState<string | null>(null);
  const [isValidNameHint, setIsValidNameHint] = useState<string | null>(null);
  const [isValidcountyHint, setIsValidcountyHint] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const message = useRef<any>();

  /**
   * This hook is called when the object is changed. This happens
   * in the parent view when the is changed
   */
  useEffect(() => {
    setRecordId(props?.countyObject?.id);
    setCountyName(props?.countyObject?.name);
    setCountyTerritory(props?.countyObject?.territoryId);
    setChairpersonDateElected(props?.countyObject?.chairpersonDateElected);
    setChairpersonAccountId(props?.countyObject?.chairpersonAccountId);
    fetchAccountsFromServer(null);
  }, [props?.countyObject]);

  /**
   * This clears the form by setting form values to null
   */
  const clearForm = () => {
    setRecordId(null);
    setCountyName(null);
    setCountyTerritory(null);
    setChairpersonAccountId(null);
    setChairpersonDateElected(null);
  };

  /**
   * This is a list of county form fields
   */
  let countyFormFields: any = [
    {
      type: FormFieldTypes.TEXT.toString(),
      label: "Name",
      value: countyName,
      onChange: setCountyName,
      setHint: setIsValidNameHint,
      isValidHint: isValidNameHint,
      validateFieldFn: validateEmptyField,
    },
    {
      type: FormFieldTypes.DROPDOWN.toString(),
      label: "County",
      value: countyTerritory,
      onChange: setCountyTerritory,
      options: props?.territoryOptions,
      optionLabel: "name",
      optionValue: "id",
      setHint: setIsValidcountyHint,
      isValidHint: isValidcountyHint,
      validateFieldFn: validateEmptyField,
    },
    {
      type: FormFieldTypes.DROPDOWN.toString(),
      label: "Chairperson",
      value: chairpersonAccountId,
      onChange: setChairpersonAccountId,
      options: accounts,
      onFilter: (event: any) => filterAcccountsFromServer(event.filter),
      optionLabel: "firstName",
      optionValue: "id",
      itemTemplate: accountLabelTemplate,
    },
    {
      type: FormFieldTypes.DATE.toString(),
      label: "date",
      value: chairpersonDateElected,
      onChange: setChairpersonDateElected,
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
   * This fetches accounts from the back office for the charperson dropdown
   */
  const fetchAccountsFromServer = (searchTerm: string | null) => {
    let query: any = { offset: 0, limit: MAXIMUM_RECORDS_PER_PAGE };
    if (searchTerm != null) {
      query.searchTerm = searchTerm;
    }
    new BaseApiServiceImpl("/api/..")
      .getRequestWithJsonResponse(query)
      .then(async (response) => {
        setAccounts(response?.records);
      })
      .catch((error) => {
        MessageUtils.showErrorMessage(message, error.message);
      });
  };

  /**
   * This checks whether the account dropdown SearchTerm has more than 2 characters before it submits
   * a request to the server to filter for accounts
   * @param event
   */
  const filterAcccountsFromServer = (event: any) => {
    const queryTerm = event.filter;
    if (queryTerm != null && queryTerm.length >= 2) {
      fetchAccountsFromServer(queryTerm);
    }
  };
  /**
   * This submits a save county request to the backoffice
   */
  const saveCounty = () => {
    let countyData: any = {
      id: recordId,
      name: countyName,
      territoryId: countyTerritory,
      chairpersonAccountId: chairpersonAccountId,
      chairpersonDateElected: chairpersonDateElected,
    };

    if (validateForm()) {
      setIsSaving(true);
      new BaseApiServiceImpl("/api/..")
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
      <Button label={labels.LABEL_SAVE} icon={PrimeIcons.SAVE} className="p-button-secondary" onClick={saveCounty} loading={isSaving} />
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

export default CountyFormDialogView;
