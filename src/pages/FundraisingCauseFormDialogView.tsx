import { Dialog } from "primereact/dialog";
import { Messages } from "primereact/messages";
import { ReactNode, useEffect, useRef, useState } from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { FormFieldTypes } from "../app_utils/constants/FormFieldTypes";
import { getFormFieldComponent, validateEmptyField } from "../app_utils/components/FormFieldTemplates";
import { accountLabelTemplate, formatString } from "../app_utils/utils/Utils";
import { MISSING_FORM_INPUT_MESSAGE } from "../app_utils/constants/ErrorMessages";
import { CSS_COL_12, CSS_COL_6, FUNDRAISING_PLAN_TYPES, MAXIMUM_RECORDS_PER_PAGE, PAYMENT_FREQUENCIES } from "../app_utils/constants/Constants";
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

const FundraisingCauseFormDialogView = (props: ModalType) => {
  const [id, setId] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [name, setName] = useState<string>("string");
  const [description, setDescription] = useState<string>("string");
  const [imageUrl, setImageUrl] = useState<string>("string");
  const [fundraisingPlanTypeId, setFundraisingPlanTypeId] = useState<number>(0);
  const [minimumContribution, setMinimumContribution] = useState<number>(0);
  const [fixedOneTimeContribution, setFixedOneTimeContribution] = useState<number>(0);
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [periodicContributionAmount, setPeriodicContributionAmount] = useState<number>(0);
  const [recurringPaymentFrequencyId, setRecurringPaymentFrequencyId] = useState<number>(0);

  const [categories, setCategories] = useState<any>([]);

  const [isValidNameHint, setIsValidNameHint] = useState<string | null>(null);
  const [isValidCategoryHint, setIsValidCategoryHint] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const message = useRef<any>();

  /**
   * This hook is called when the object is changed. This happens
   * in the parent view when the is changed
   */
  useEffect(() => {
    populateForm(props?.memberObject);
    fetchCategoriesFromServer();
  }, [props?.memberObject]);

  const fetchCategoriesFromServer = () => {
    new BaseApiServiceImpl("/api/v1/lookups/lookup-values")
      .getRequestWithJsonResponse({ offset: 0, limit: MAXIMUM_RECORDS_PER_PAGE, lookupTypeId: 6 })
      .then(async (response) => {
        setCategories(response?.records);
      })
      .catch((error) => {
        MessageUtils.showErrorMessage(message, error.message);
      });
  };

  /**
   * This clears the form by setting form values to null
   */
  const clearForm = () => {
    populateForm(null);
  };

  const populateForm = (dataObject: any) => {
    setId(dataObject?.id);
    setName(dataObject?.name);
  };

  /**
   * This is a list of member form fields
   */
  let memberFormFields: any = [
    {
      type: FormFieldTypes.TEXT.toString(),
      label: "Name",
      value: name,
      onChange: setName,
      setHint: setIsValidNameHint,
      isValidHint: isValidNameHint,
      validateFieldFn: validateEmptyField,
      width: CSS_COL_6,
    },

    {
      type: FormFieldTypes.DROPDOWN.toString(),
      label: "Category",
      value: categoryId,
      onChange: setCategoryId,
      options: categories,
      optionValue: "id",
      optionLabel: "name",
      setHint: setIsValidCategoryHint,
      isValidHint: isValidCategoryHint,
      validateFieldFn: validateEmptyField,
      width: CSS_COL_6,
    },

    {
      type: FormFieldTypes.DROPDOWN.toString(),
      label: "Plan Type",
      value: fundraisingPlanTypeId,
      onChange: setFundraisingPlanTypeId,
      options: FUNDRAISING_PLAN_TYPES,
      optionValue: "id",
      optionLabel: "name",
      width: CSS_COL_6,
    },

    {
      type: FormFieldTypes.DROPDOWN.toString(),
      label: "Payment Frequency",
      value: recurringPaymentFrequencyId,
      onChange: setRecurringPaymentFrequencyId,
      options: PAYMENT_FREQUENCIES,
      optionValue: "id",
      optionLabel: "name",
      width: CSS_COL_6,
    },

    {
      type: FormFieldTypes.NUMBER.toString(),
      label: "Minimum Contribution",
      value: minimumContribution,
      onChange: setMinimumContribution,
      width: CSS_COL_6,
    },
    {
      type: FormFieldTypes.NUMBER.toString(),
      label: "Target Amount",
      value: targetAmount,
      onChange: setTargetAmount,
      width: CSS_COL_6,
    },
    {
      type: FormFieldTypes.NUMBER.toString(),
      label: "Periodic Contribution Amount",
      value: periodicContributionAmount,
      onChange: setPeriodicContributionAmount,
      width: CSS_COL_6,
    },
    {
      type: FormFieldTypes.NUMBER.toString(),
      label: "Fixed One-Time Contribution",
      value: fixedOneTimeContribution,
      onChange: setFixedOneTimeContribution,
      width: CSS_COL_6,
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
      id,
      categoryId,
      name,
      description,
      imageUrl,
      fundraisingPlanTypeId,
      minimumContribution,
      fixedOneTimeContribution,
      targetAmount,
      periodicContributionAmount,
      reccuringPaymentFrequencyId: recurringPaymentFrequencyId, // Correct the typo in field name
    };

    if (validateForm()) {
      setIsSaving(true);
      new BaseApiServiceImpl("/api/v1/fundraising-causes")
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
    <Dialog minX={200} visible={props.isOpen} header={"Fundraising Program form"} footer={memberDetailsDialogFooter} modal className="p-fluid" onHide={closeDialog} style={{ width: "50vw" }}>
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

export default FundraisingCauseFormDialogView;
