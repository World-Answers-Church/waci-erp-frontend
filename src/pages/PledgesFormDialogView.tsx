import { Dialog } from "primereact/dialog";
import { Messages } from "primereact/messages";
import { ReactNode, useEffect, useRef, useState } from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { FormFieldTypes } from "../app_utils/constants/FormFieldTypes";
import { getFormFieldComponent, validateEmptyField } from "../app_utils/components/FormFieldTemplates";
import { accountLabelTemplate, formatString, memberLabelTemplate } from "../app_utils/utils/Utils";
import { MISSING_FORM_INPUT_MESSAGE } from "../app_utils/constants/ErrorMessages";
import { CSS_COL_12, CSS_COL_6, FUNDRAISING_PLAN_TYPES, MAXIMUM_RECORDS_PER_PAGE, MINIMUM_FILTER_QUERY_LENGTH, PAYMENT_FREQUENCIES } from "../app_utils/constants/Constants";
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

const PledgesFormDialogView = (props: ModalType) => {
  const [id, setId] = useState<number>(0);
  const [memberId, setMemberId] = useState<number>(0);
  const [programId, setProgramId] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<any>(new Date());
  const [programs, setPrograms] = useState<any>([]);
  const [members, setMembers] = useState<any>([]);

  const [isValidMemberIdHint, setIsValidMemberIdHint] = useState<string | null>(null);
  const [isValidProgramIdHint, setIsValidProgramIdHint] = useState<string | null>(null);
  const [isValidAmountHint, setIsValidAmountHint] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const message = useRef<any>();

  /**
   * This hook is called when the object is changed. This happens
   * in the parent view when the is changed
   */
  useEffect(() => {
    populateForm(props?.memberObject);
    fetchMembersFromServer(props?.memberObject?.memberName);
    fetchProgramsFromServer(props?.memberObject?.fundraisingCauseName);
  }, [props?.memberObject]);

  const fetchProgramsFromServer = (searchTerm: any) => {
    let searchParams: any = { offset: 0, limit: MAXIMUM_RECORDS_PER_PAGE };
    if (searchTerm != null && searchTerm != undefined) {
      searchParams.searchTerm = searchTerm;
    }
    new BaseApiServiceImpl("/api/v1/fundraising-causes")
      .getRequestWithJsonResponse(searchParams)
      .then(async (response) => {
        setPrograms(response?.records);
      })
      .catch((error) => {
        MessageUtils.showErrorMessage(message, error.message);
      });
  };

  const fetchMembersFromServer = (searchTerm: any) => {
    let searchParams: any = { offset: 0, limit: MAXIMUM_RECORDS_PER_PAGE };
    if (searchTerm != null && searchTerm != undefined) {
      searchParams.searchTerm = searchTerm;
    }

    new BaseApiServiceImpl("/api/v1/members")
      .getRequestWithJsonResponse(searchParams)
      .then(async (response) => {
        setMembers(response?.records);
      })
      .catch((error) => {
        MessageUtils.showErrorMessage(message, error.message);
      });
  };
  const onMemberFilter = (filterEvent: any) => {
    const filterTerm = filterEvent.filter;
    if (filterTerm.length >= MINIMUM_FILTER_QUERY_LENGTH || filterTerm.length % 2 === 0) {
      fetchMembersFromServer(filterTerm);
    }
  };

  const onProgramFilter = (filterEvent: any) => {
    const filterTerm = filterEvent.filter;
    if (filterTerm.length >= MINIMUM_FILTER_QUERY_LENGTH || filterTerm.length % 2 === 0) {
      fetchProgramsFromServer(filterTerm);
    }
  };
  /**
   * This clears the form by setting form values to null
   */
  const clearForm = () => {
    populateForm(null);
  };

  const populateForm = (dataObject: any) => {
    setId(dataObject?.id);
    setMemberId(dataObject?.memberId);
    setProgramId(dataObject?.fundraisingCauseId);
    setAmount(dataObject?.amount);
    setDate(dataObject?.date);
  };

  /**
   * This is a list of member form fields
   */
  let memberFormFields: any = [
    {
      type: FormFieldTypes.DROPDOWN.toString(),
      label: "Member",
      value: memberId,
      onChange: setMemberId,
      options: members,
      optionValue: "id",
      optionLabel: "fullName",
      onFilter: onMemberFilter,
      itemTemplate: memberLabelTemplate,
      setHint: setIsValidMemberIdHint,
      isValidHint: isValidMemberIdHint,
      validateFieldFn: validateEmptyField,
      width: CSS_COL_6,
    },

    {
      type: FormFieldTypes.DROPDOWN.toString(),
      label: "Program",
      value: programId,
      onChange: setProgramId,
      options: programs,
      optionValue: "id",
      optionLabel: "name",
      onFilter: onProgramFilter,
      setHint: setIsValidProgramIdHint,
      isValidHint: isValidProgramIdHint,
      validateFieldFn: validateEmptyField,
      width: CSS_COL_6,
    },

    {
      type: FormFieldTypes.NUMBER.toString(),
      label: "Amount",
      value: amount,
      onChange: setAmount,
      width: CSS_COL_6,
      setHint: setIsValidAmountHint,
      isValidHint: isValidAmountHint,
      validateFieldFn: validateEmptyField,
    },

    {
      type: FormFieldTypes.DATE.toString(),
      label: "Date",
      value: date,
      onChange: setDate,
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
      id: id,
      memberId,
      fundraisingCauseId: programId,
      datePledged: date,
      amount,
    };

    if (validateForm()) {
      setIsSaving(true);
      new BaseApiServiceImpl("/api/v1/pledges")
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
    <Dialog minX={200} visible={props.isOpen} header={"Add pledge form"} footer={memberDetailsDialogFooter} modal className="p-fluid" onHide={closeDialog} style={{ width: "50vw" }}>
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

export default PledgesFormDialogView;
