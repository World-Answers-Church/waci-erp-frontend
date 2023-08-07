import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState, useEffect, useRef } from "react";
import { Messages } from "primereact/messages";
import { Paginator } from "primereact/paginator";
import { useHistory } from "react-router";
import { Panel } from "primereact/panel";
import { BreadCrumb } from "primereact/breadcrumb";
import * as constants from "../app_utils/constants/Constants";

import * as labels from "../app_utils/constants/Labels";
import useShowModalDialog from "../app_utils/components/ShowModalHook";
import { HOME_ROUTE_PATH } from "../app_utils/route_paths/resolver/PageRoutes";
import { PrimeIcons } from "primereact/api";
import { BaseApiServiceImpl } from "../app_utils/api/BaseApiServiceImpl";
import { MessageUtils } from "../app_utils/utils/MessageUtils";
import { replaceWithUnderscore, toReadableDate } from "../app_utils/utils/Utils";
import { getFilterComponent } from "../app_utils/components/Filters";
import { paginatorTemplate } from "../app_utils/components/PaginatorTemplate";
import { filtersHeadertemplate } from "../app_utils/components/FiltersPanelHeader";
import MemberFormDialogView from "./MemberFormDialogView";
import FundraisingCauseFormDialogView from "./FundraisingCauseFormDialogView";
import PledgesFormDialogView from "./PledgesFormDialogView";

const PledgesView = () => {
  const [records, setRecords] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTermFilter, setSearchTermFilter] = useState<string | null>(null);
  const [recordStatusFilter, setRecordStatusFilter] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [first, setFirst] = useState<number>(0);
  const [limit, setLimit] = useState<number>(constants.MAXIMUM_RECORDS_PER_PAGE);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [programs, setPrograms] = useState<any>([]);
  const [programFilter, setProgramFilter] = useState<any>(null);

  let offset = 0;

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
      label: `Pledges`,
      icon: PrimeIcons.FLAG,
    },
  ];

  /**
   * This gets the parameters to submit in the GET request to back office
   * @returns
   */
  const getQueryParameters = () => {
    let searchParameters: any = { offset: offset, limit: limit };
    if (searchTermFilter !== null) searchParameters.searchTerm = searchTermFilter;
    if (recordStatusFilter !== null) searchParameters.recordStatus = recordStatusFilter;
    if (programFilter !== null) searchParameters.programId = programFilter;

    return searchParameters;
  };

  /**
   * This fetches counties from the back office using the search parameters
   */
  const fetchRecordsFromServer = () => {
    setIsLoading(true);
    let searchParameters: any = getQueryParameters();

    new BaseApiServiceImpl("/api/v1/pledges")
      .getRequestWithJsonResponse(searchParameters)
      .then(async (response) => {
        setIsLoading(false);
        setRecords(response?.records);
        setTotalItems(response?.totalItems);
      })
      .catch((error) => {
        setIsLoading(false);
        MessageUtils.showErrorMessage(message, error.message);
      });
  };
  const fetchProgramsFromServer = () => {
    let searchParameters: any = { offset: 0, limit: constants.MAXIMUM_RECORDS_PER_PAGE };

    new BaseApiServiceImpl("/api/v1/fundraising-causes")
      .getRequestWithJsonResponse(searchParameters)
      .then(async (response) => {
        setPrograms(response?.records);
      })
      .catch((error) => {
        MessageUtils.showErrorMessage(message, "Failed to load programs");
      });
  };

  /**
   * This hook is called everytime the page is loaded
   */
  useEffect(() => {
    fetchRecordsFromServer();
    fetchProgramsFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * This is used everytime the user presses the enter button on any form input of a filter
   */
  const onSubmitFilter = () => {
    setSearchTermFilter(searchTermFilter);
    setRecordStatusFilter(recordStatusFilter);
    setProgramFilter(programFilter);
    fetchRecordsFromServer();
  };

  /**
   * This is used to clear all filters and resubmit the get request to the back office
   */
  const resetFilters = () => {
    setSearchTermFilter("");
    setRecordStatusFilter(null);
    setProgramFilter(null);
    fetchRecordsFromServer();
  };

  /**
   * This opens the edit territory dialog form by toggling the open dialog variable
   */
  const openEditFormDialog = (selectedRecord: any) => {
    setSelectedMember(selectedRecord);
    toggleOpenDialog();
  };

  /**
   * This opens the new territory dialog form by toggling the open dialog variable
   * and setting the selected territory to null
   */
  const openNewFormDialog = () => {
    setSelectedMember(null);
    toggleOpenDialog();
  };

  /**
   * The row index template
   * @param rowData
   * @param props
   * @returns
   */
  const rowIndexTemplate = (rowData: any, props: any) => {
    return (
      <React.Fragment>
        <span>{first + (props.rowIndex + 1)}</span>
      </React.Fragment>
    );
  };

  /**
   * This is called when a paginator link is clicked
   * @param e
   */
  const onPageChange = (e: any) => {
    offset = e.page * constants.MAXIMUM_RECORDS_PER_PAGE;
    setFirst(e.first);
    setLimit(constants.MAXIMUM_RECORDS_PER_PAGE);

    fetchRecordsFromServer();
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
    return <span className={`status-badge status-${rowData?.recordStatus?.toLowerCase()}`}>{rowData?.recordStatus}</span>;
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
   * The template for the filter buttons
   */
  const filterButtonsTemplate = (
    <>
      <div className="col-2 p-fluid" key="filterBtns">
        <Button icon={constants.ICON_SEARCH} className={constants.CSS_FILTER_SUBMIT_BUTTON} onClick={onSubmitFilter} loading={isLoading} />
        <Button icon={constants.ICON_REFRESH} className={constants.CSS_FILTER_RESET_BUTTON} onClick={resetFilters} loading={isLoading} />
      </div>
    </>
  );

  /**
   * This is a list of filters to display in the filter section
   */
  const filterDetails = [
    {
      type: "text",
      value: searchTermFilter,
      onChangeFn: setSearchTermFilter,
      id: "searchTermFilter",
      label: labels.LABEL_SEARCH_TERM,
      colWidth: constants.CSS_FILTER_SEARCH_INPUT_DIV,
      onkeydownFn: onSubmitFilter,
    },
    {
      type: "multiselect",
      value: recordStatusFilter,
      onChangeFn: setRecordStatusFilter,
      id: "recordStatusFilter",
      label: labels.LABEL_RECORD_STATUS,
      options: constants.RECORD_STATUSES,
      optionLabel: "value",
      optionValue: "id",
      colWidth: constants.CSS_FILTER_DEFAULT_DIV,
      onkeydownFn: onSubmitFilter,
    },
    {
      type: "dropdown",
      value: programFilter,
      onChangeFn: setProgramFilter,
      id: "setTerritoryFilter",
      label: "Program",
      options: programs,
      optionLabel: "name",
      optionValue: "id",
      colWidth: constants.CSS_FILTER_DEFAULT_DIV,
      onkeydownFn: onSubmitFilter,
    },
  ];

  /**
   * This loops through the filter Details array and returns the components
   * to render in the detailed form filter dialog.
   */
  const dynamicFilterDetails = filterDetails.map((filter: any) => {
    let component = getFilterComponent(filter);
    return (
      <div className={filter.colWidth} key={replaceWithUnderscore(filter.id)}>
        <label htmlFor={filter.id}>{filter.label}</label>
        {component}
      </div>
    );
  });

  return (
    <div className="grid">
      <div className="col-6 flex justify-content-start flex-wrap">
        <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
      </div>
      <div className="col-6 flex justify-content-end flex-wrap">
        <Button label={"Add Pledge"} icon={PrimeIcons.PLUS} className="p-button-secondary" onClick={openNewFormDialog} />
      </div>
      <Messages ref={message} style={{ width: "100%" }} />
      <div className="col-12">
        <Panel headerTemplate={filtersHeadertemplate} toggleable>
          <div className="grid">
            {dynamicFilterDetails}
            {filterButtonsTemplate}
          </div>
        </Panel>
      </div>
      <div className="col-12">
        <div className="card">
          <DataTable value={records} paginator={false} className="datatable-responsive" paginatorPosition="both" emptyMessage="No record found." loading={isLoading}>
            <Column field="Index" header="#" style={{ width: "70px" }} body={rowIndexTemplate}></Column>
            <Column field="memberName" header={"Member"}></Column>
            <Column field="fundraisingCauseName" header={"Programme"}></Column>
            <Column field="amount" header={"Amount"}></Column>
            <Column field="date" header={"Date"}></Column>
            <Column header={labels.LABEL_STATUS} body={statusBodyTemplate}></Column>
            <Column style={{ width: "120px" }} header="Actions" body={actionBodyTemplate}></Column>
          </DataTable>

          <Paginator first={first} rows={constants.MAXIMUM_RECORDS_PER_PAGE} totalRecords={totalItems} alwaysShow={true} onPageChange={onPageChange} template={paginatorTemplate} />
        </div>
      </div>
      <PledgesFormDialogView isOpen={openDialog} toggle={toggleOpenDialog} messageRef={message} memberObject={selectedMember} reloadFn={fetchRecordsFromServer}></PledgesFormDialogView>
    </div>
  );
};

export default PledgesView;
