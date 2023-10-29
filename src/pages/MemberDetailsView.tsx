import { Button } from "primereact/button";
import { useState, useEffect, useRef } from "react";
import { Messages } from "primereact/messages";
import { useHistory } from "react-router";
import { BreadCrumb } from "primereact/breadcrumb";

import { useParams } from "react-router-dom";
import * as labels from "../app_utils/constants/Labels";
import useShowModalDialog from "../app_utils/components/ShowModalHook";
import {
  HOME_ROUTE_PATH,
  MEMBERS_ROUTE_PATH,
} from "../app_utils/route_paths/resolver/PageRoutes";
import { PrimeIcons } from "primereact/api";
import { BaseApiServiceImpl } from "../app_utils/api/BaseApiServiceImpl";
import { MessageUtils } from "../app_utils/utils/MessageUtils";
import {
  generalStatusBodyTemplate,
  sanitizeValue,
  toReadableDate,
} from "../app_utils/utils/Utils";
import MemberFormDialogView from "./MemberFormDialogView";

const MemberDetailsView = () => {
  let urlParams = useParams();
  let id = JSON.parse(JSON.stringify(urlParams)).id;
  const [record, setRecord] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const message = useRef<any>();
  const history = useHistory();

  const { openDialog, toggleOpenDialog } = useShowModalDialog();

  /**
   * These are the bread crumbs that serve as the title of the page
   */
  const breadcrumbHome = {
    icon: "pi pi-home",
    command: () => {
      history.push(HOME_ROUTE_PATH);
    },
  };

  const breadcrumbItems = [
    {
      label: `Members`,
      icon: PrimeIcons.FLAG,
      command: () => {
        history.push(MEMBERS_ROUTE_PATH);
      },
    },
    {
      label: record?.fullName,
      icon: PrimeIcons.FLAG,
    },
  ];

  /**
   * This fetches counties from the back office using the search parameters
   */
  const fetchRecordFromServer = () => {
    setIsLoading(true);

    new BaseApiServiceImpl("/api/v1/members/" + id)
      .getRequestWithJsonResponse({})
      .then(async (response) => {
        setIsLoading(false);
        setRecord(response?.data);
      })
      .catch((error) => {
        setIsLoading(false);
        MessageUtils.showErrorMessage(message, error.message);
      });
  };

  /**
   * This hook is called everytime the page is loaded
   */
  useEffect(() => {
    fetchRecordFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * This opens the edit territory dialog form by toggling the open dialog variable
   */
  const openEditFormDialog = (selectedRecord: any) => {
    toggleOpenDialog();
  };

  /**
   * This opens the new territory dialog form by toggling the open dialog variable
   * and setting the selected territory to null
   */
  const openNewFormDialog = () => {
    toggleOpenDialog();
  };

  /**
   * The action body template
   * @param rowData
   * @returns
   */
  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="actions">
        <Button
          label={labels.LABEL_EDIT}
          className="p-button-sm p-button-warning p-mr-2"
          onClick={() => {
            openEditFormDialog(rowData);
          }}
        />
      </div>
    );
  };

  /**
   * The record status row template
   * @param rowData
   * @returns
   */
  const statusBodyTemplate = (rowData: any) => {
    return generalStatusBodyTemplate(rowData?.recordStatus);
  };

  /**
   * The date  row template
   * @param rowData
   * @returns
   */
  const dateTemplate = (rowData: any) => {
    return <>{toReadableDate(rowData.chairpersonDateElected)}</>;
  };
  /**
   * These are the incident details fields for display. Each field has a name and a label
   */
  const memberFields = [
    {
      label: labels.FIRST_NAME_LABEL,
      value: sanitizeValue(record?.firstName),
    },
    {
      label: labels.LAST_NAME_LABEL,
      value: sanitizeValue(record?.lastName),
    },
    {
      label: labels.MIDDLE_NAME_LABEL,
      value: sanitizeValue(record?.middleName),
    },
    {
      label: labels.SALUTATION_LABEL,
      value: sanitizeValue(record?.salutationName),
    },
    {
      label: labels.GENDER_LABEL,
      value: sanitizeValue(record?.genderName),
    },
    {
      label: labels.PHYSICAL_ADDRESS_LABEL,
      value: sanitizeValue(record?.address),
    },
    {
      label: labels.PHONE_NUMBER_LABEL,
      value: sanitizeValue(record?.phoneNumber),
    },
    {
      label: labels.EMAIL_ADDRESS_LABEL,
      value: sanitizeValue(record?.emailAddress),
    },
    {
      label: labels.YEAR_JOINED_LABEL,
      value: sanitizeValue(record?.yearJoined),
    },
    {
      label: labels.OCCUPATION_LABEL,
      value: sanitizeValue(record?.occupationName),
    },
    {
      label: labels.NIN_LABEL,
      value: sanitizeValue(record?.nin),
    },
    {
      label: labels.IMAGE_URL_LABEL,
      value: sanitizeValue(record?.imageUrl),
    },
  ];

  /**
   * This is the template for the incident detail fields for display
   */
  let mappedMemberFields = memberFields?.map((incidentField: any) => {
    return (
      <div className="col-12 md:col-4">
        <div className="field mb-0">
          <label>{incidentField.label}</label>
          <label className="font-medium w-full">{incidentField.value}</label>
        </div>
      </div>
    );
  });
  return (
    <div className="grid">
      <div className="col-6 flex justify-content-start flex-wrap">
        <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
      </div>

      <Messages ref={message} style={{ width: "100%" }} />

      <div className="col-12">
        <div className="card">
          {" "}
          <div className="col-12">
            <div className="grid">{mappedMemberFields}</div>
          </div>
        </div>
      </div>
      <MemberFormDialogView
        isOpen={openDialog}
        toggle={toggleOpenDialog}
        messageRef={message}
        memberObject={record}
        reloadFn={fetchRecordFromServer}
      ></MemberFormDialogView>
    </div>
  );
};

export default MemberDetailsView;
