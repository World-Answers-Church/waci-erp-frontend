/**
 * User session key placeholders
 */
export const APP_NAME = "Tugende CRM";
export const KEY_APP_VERSION = "v1.0.0"; // This represents the current running app version that has to be updated when making a release
/**
 * This has been moved from the .env file because it was not being set as an environment variable. React does not
 * read directly from the environment and therefore the read has to be done from the .env file.
 * Also, the risk of other people using this key is minimized by setting the URIs in the Google Console.
 * More research needs to be done to read the variable from the .env file
 */
export const REACT_APP_GOOGLE_CLIENT_ID = "631187462392-bu7ph8e7nis0olor367ugdt5iooghmei.apps.googleusercontent.com";
export const KEY_BEARER_TOKEN = "KEY_BEARER_TOKEN";
export const KEY_REFRESH_TOKEN = "KEY_REFRESH_TOKEN";
export const KEY_USER_DETAILS = "KEY_USER_DETAILS";
export const KEY_SELECTED_APPLICATION_MODULE = "KEY_SELECTED_APPLICATION_MODULE";
export const KEY_SELECTED_OBJECT = "KEY_SELECTED_OBJECT";
export const KEY_IS_LOGGED_IN = "KEY_IS_LOGGED_IN";
export const KEY_RANDOM_DEVICE_ID = "KEY_RANDOM_DEVICE_ID";
export const MAXIMUM_RECORDS_PER_PAGE: number = 20;
export const SEARCH_DATE_FILTER_FORMAT = "yy-mm-dd";
export const SEARCH_DATE_TIME_FILTER_FORMAT = "yy-mm-dd";
export const TITLE_FILTER_HEADER = "Filters";
export const NULLISH_DATE = "0001-01-01T00:00:00+00:00";

/**
 * This is the main content layout id. It houses the container that has the main display.
 * Use it in scenarios where where you want to replace the current content without
 * modifying the URL
 */
export const ID_LAYOUT_CONTENT = "layoutContent";

export const ICON_SEARCH = "pi pi-search";
export const ICON_REFRESH = "pi pi-refresh";
export const CSS_FILTER_SUBMIT_BUTTON = "p-button-primary mr-2 ml-2 mt-5";
export const CSS_FILTER_RESET_BUTTON = "p-button-secondary mr-2 ml-2 mt-5";
export const CSS_FILTER_SEARCH_INPUT_DIV = "field col-4 p-fluid";
export const CSS_FILTER_SEARCH_INPUT_NORMAL_DIV = "field col-2 p-fluid";
export const CSS_FILTER_DEFAULT_DIV = "field col-2 p-fluid";
export const CSS_FILTER_SMALL_DIV = "field col-1 p-fluid";
export const CSS_FILTER_MEDIUM_DIV = "field col-3 p-fluid";
export const CSS_ADD_NEW_BUTTON = "p-button-outlined p-button-indigo mr-2 mb-2";
export const CSS_EDIT_BUTTON = "p-button-rounded p-button-success mr-2";
export const CSS_MD_COL_3 = "md:col-3";
export const CSS_MD_COL_12 = "md:col-12";
export const CSS_COL_2 = "col-2";
export const CSS_COL_3 = "col-3";
export const CSS_COL_4 = "col-4";
export const CSS_COL_6 = "col-6";
export const CSS_COL_8 = "col-8";
export const CSS_COL_9 = "col-9";
export const CSS_COL_10 = "col-10";
export const CSS_COL_12 = "col-12";

export const CSS_BACK_BUTTON = "p-button-secondary mr-2 mb-2";
export const LABEL_BACK_BUTTON = "Back To List";
export const LABEL_BACK = "Back";
export const ICON_BACKWARD = "pi pi-fast-backward";
export const ICON_ADD_NEW = "pi pi-plus";
export const ICON_EDIT = "pi pi-pencil";
export const ICON_SYNC = "pi pi-sync";

export const ICON_BACK_OFFICE_TOP_BAR = "pi pi-user-edit action green-bgcolor white-color";
export const ICON_CRM_CORE_TOP_BAR = "pi pi-cog action pink-bgcolor white-color";
export const ICON_DOCUMENT_REPOSITORY_TOP_BAR = "pi pi-folder action blue-bgcolor white-color";

export const ICON_COLLECTIONS_TOP_BAR = "pi pi-image action indigo-bgcolor white-color";
export const ICON_REPORTS_TOP_BAR = "pi pi-file-pdf action orange-bgcolor white-color";
export const ICON_PRODUCTS_TOP_BAR = "pi pi-th-large action teal-bgcolor white-color";
export const ICON_CLIENT_SEARCH_TOP_BAR = "pi pi-search action green-bgcolor white-color";
export const ICON_VETTING_TOP_BAR = "pi pi-check-circle action teal-bgcolor white-color";
export const ICON_INCIDENTS_TOP_BAR = "pi pi-exclamation-circle action orange-bgcolor white-color";
export const ICON_SERVER_STATS_TOP_BAR = "pi pi-chart-bar action orange-bgcolor white-color";
export const ICON_MANUAL_TRANSACTIONS_TOP_BAR = "pi pi-credit-card action blue-bgcolor white-color";
export const ICON_NOTIFICATIONS_TOP_BAR = "pi pi-envelope action purple-bgcolor white-color";
export const ICON_ENGAGEMENTS = "pi pi-comments action blue-bgcolor white-color";
export const ICON_LEADS_GENERATION = "pi pi-user-plus action brown-bgcolor white-color";

export const BTN_BACKOFFICE_CSS = "p-button-rounded p-button-success";
export const BTN_SETTINGS_CSS = "p-button-rounded p-button-info action pink-bgcolor white-color";
export const BTN_DOCUMENT_REPOSITORY_CSS = "p-button-rounded p-button-info action blue-bgcolor white-color";

export const BTN_CLIENT_SEARCH_CSS = "p-button-rounded p-button-success";
export const BTN_VETTING_CSS = "p-button-rounded p-button-info";
export const BTN_INCIDENTS_CSS = "p-button-rounded p-button-warning";
export const BTN_SERVER_STATS_INCIDENTS_CSS = "p-button-rounded p-button-danger";
export const BTN_MANUAL_TRANSACTIONS_CSS = "p-button-rounded p-button-primary";
export const BTN_NOTIFICATIONS_CSS = "p-button-rounded p-button-help";
export const BTN_ENGEGEMENTS_CSS = "p-button-rounded p-button-secondary";
export const BTN_LEADS_GENERATION_CSS = "p-button-rounded p-button-dark-brown";

//Module root paths
export const CLIENT_SEARCH_ROOT_PATH = "/client";
export const INCIDENTS_ROOT_PATH = "/incident";
export const VETTING_ROOT_PATH = "/vetting";
export const NOTES_DASHBOARD_ROOT_PATH = "/engagements";
export const LEADS_ROOT_PATH = "/leads-generation";
export const MANUAL_TRANSACTIONS_ROOT_PATH = "/transactions";
export const BACKOFFICE_ROOT_PATH = "/backoffice";

export const BACKEND_KNOWN_HTTP_ERROR_CODES = [
    400,
    403,
    415,
    500
];

export const RECORD_STATUSES = [
    { id: 0, value: "Active" },
    { id: "-1", value: "Deactivated" },
];

export const NOTES_TOPICS_ANNEX = {
    TOPIC: "Topic",
    BRANCH: "Branch",
    OFFICER: "Officer",
    PRODUCT: "Product",
    DURATION: "Duration",
};

export const VETTING_TOOL_FORM_TYPES = [
    { key: "Client", value: 1 },
    { key: "Guarantor", value: 2 },
];

export const VETTING_FIELD_TYPES = [
    { key: "Integer", value: 1 },
    { key: "Decimal", value: 2 },
    { key: "SmallText", value: 3 },
    { key: "LargeText", value: 4 },
    { key: "Email", value: 5 },
    { key: "Lookup", value: 6 },
    { key: "Coordinates", value: 7 },
    { key: "Image", value: 8 },
    { key: "PhoneNumber", value: 9 },
    { key: "Date", value: 10 },
    { key: "DateTime", value: 11 },
    { key: "Attachment", value: 12 },
    { key: "Video", value: 13 },
    { key: "GenericType", value: 14 },
    { key: "Boolean", value: 15 },
    { key: "KYCField", value: 16 },
    { key: "UserLookup", value: 17 },
];

export const VETTING_ATTACHMENT_FILE_TYPES = [
    { key: "PDF", value: "PDF" },
    { key: "MP4", value: "MP4" },
    { key: "MP3", value: "MP3" },
    { key: "JPG", value: "JPG" },
    { key: "JPEG", value: "JPEG" },
    { key: "PNG", value: "PNG" },
];

export const VETTING_KYC_FIELD_TYPES = [
    { key: "NationalID", value: 1 },
    { key: "Surname", value: 2 },
    { key: "Other Name", value: 3 },
    { key: "DOB", value: 4 },
    { key: "Gender", value: 5 },
    { key: "Profession", value: 6 },
    { key: "Marital Status", value: 7 },
    { key: "Primary Phone Number", value: 8 },
];

export const VETTING_CLIENT_STATUSES = [{ key: "Claimed", value: 2 }];

export const VETTING_TASK_STATUSES = [
    { key: "New", value: 0 },
    { key: "In Progress", value: 30 },
    { key: "Claimed", value: 20 },
    { key: "Released", value: 10 },
    { key: "Completed", value: 100 },
];

export const VETTING_PRODUCTS_LOOKUP_CLASS_NAME = "Products";
export const VETTING_PRODUCTS_LOOKUP_CLASS_ID = "71";

export const VETTING_TOOL_DRAFT_STATUS = 0;
export const VETTING_TOOL_ACTIVE_STATUS = 1;

export const INCIDENTS_FIELD_DATA_TYPES = [
    { key: "Integer", value: 1 },
    { key: "Decimal", value: 2 },
    { key: "SmallText", value: 3 },
    { key: "LargeText", value: 4 },
    { key: "Email", value: 5 },
    { key: "Lookup", value: 6 },
    { key: "Coordinates", value: 7 },
    { key: "Image", value: 8 },
    { key: "PhoneNumber", value: 9 },
    { key: "Date", value: 10 },
    { key: "DateTime", value: 11 },
    { key: "Attachment", value: 12 },
    { key: "Video", value: 13 },
    { key: "GenericType", value: 14 },
    { key: "Boolean", value: 15 },
    { key: "KYCField", value: 16 },
    { key: "UserLookup", value: 17 },
];

export const INCIDENTS_FORM_ACTIVE_STATUS = "Active";
export const INCIDENTS_FORM_DEACTIVE_STATUS = "Deactivated ";
export const INCIDENTS_FORM_DRAFT_STATUS = "Draft";
export const INCIDENTS_FORM_MODIFIED_STATUS = "Modified";
export const INCIDENTS_FORM_DELETED_STATUS = "Deleted";

export const INCIDENTS_TASK_STATUSES = [
    { key: "Approved", value: "Approved" },
    { key: "SubmittedForApproval", value: "SubmittedForApproval" },
];

export const INCIDENT_APPROVER_LOCATION_RESTRICTION_TYPES = [
    { name: "None", id: 0 },
    { name: "Reporter Territory", id: 10 },
    { name: "Reporter Branch", id: 20 },
];

export const INCIDENT_APPROVER_ROLE_QUALIFICATION_ID = 20;
export const INCIDENT_APPROVER_JOB_QUALIFICATION_ID = 10;

export const INCIDENT_APPROVER_QUALIFICATION_TYPES = [
    { name: "Job Title", id: INCIDENT_APPROVER_JOB_QUALIFICATION_ID },
    { name: "User Role", id: INCIDENT_APPROVER_ROLE_QUALIFICATION_ID },
];

// Module Names
export const BACK_OFFICE_MODULE_NAME = "Back Office";
export const CRM_CORE_MODULE_NAME = "CRM Core";
export const DOCUMENT_REPOSITORY_MODULE_NAME = "Document Repository";
export const DOCUMENT_REPOSITORY_MODULE_SHORT_NAME = "Doc Repo";
export const CLIENT_SEARCH_MODULE_NAME = "Client Search";
export const VETTING_MODULE_NAME = "Vetting";
export const NOTIFICATIONS_MODULE_NAME = "Notifications";
export const PAYMENTS_MODULE_NAME = "Payments";
export const PRODUCTS_MODULE_NAME = "Products";
export const REPORTS_MODULE_NAME = "Reports";
export const PAYOUTS_MODULE_NAME = "Payouts";
export const COLLECTIONS_MODULE_NAME = "Collections";
export const INCIDENTS_MODULE_NAME = "Incidents";
export const LEADS_GENERATION_MODULE_NAME = "Leads";
export const ENGAGEMENTS_PERMISSION_MODULE_NAME = "Engagements";
export const MANUAL_TRANSACTIONS_PERMISSION_MODULE_NAME = "StaffAppPayments";
export const LEADS_GENERATION_PERMISSION_MODULE_NAME = "StaggAppLeadsGeneration";
// Notifications
export const SERVER_STATS_MODULE_NAME = "Server Stats";
export const MANUAL_TRANSACTIONS_MODULE_NAME = "Transactions";
export const LOAN_UNDER_MAINTENACE_FLAG = "Loan Under Maintenance";
export const ENGAGEMENTS_MODULE_NAME = "Notes";
export const ENGAGEMENTS_MODULE_FULL_NAME = "Notes Dashboard";

export const ENGAGEMENTS_DASHBOARD_PERMISSION = "Engagement Dashboard";

// Backoffice Details
export const BACK_OFFICE_ROLE_DEACTIVATED_RECORD_STATUS = -1;
export const BACK_OFFICE_ROLE_ACTIVATED_RECORD_STATUS = 0;
export const BACKOFFICE_ACTIVE_STATUS = "Active";
export const BACKOFFICE_INACTIVE_STATUS = "Deactivated";

// Manual Transactions
export const MANUAL_PAYMENTS_PAYMENT_MODES = [
    { key: "Yo Uganda", value: "YoUganda" },
    { key: "MPESA", value: "MPESA" },
    { key: "Interswitch", value: "Interswitch" },
    { key: "Payway", value: "Payway" },
    { key: "Cente Agent", value: "CenteAgent" },
    { key: "Ezee Money", value: "EzeeMoney" },
    { key: "Bank Transaction", value: "BankTransaction" },
];

// Notifications
export const NOTIFICATIONS_MAX_FILE_SIZE = 10000000;
export const NotificationsChannels = [{ channel: "SMS" }, { channel: "Firebase" }, { channel: "Email" }];
export const NotificationBrokerStatuses = [{ name: "New" }, { name: "Pending" }, { name: "Processed" }, { name: "PartiallyProcessed" }, { name: "Failed" }, { name: "SentToBroker" }, { name: "FailedToSendToBroker" }];
export const NotificationFinalStatuses = [{ name: "Pending" }, { name: "Failed" }, { name: "Sent" }];
export const NotificationsAggregators = [{ name: "AfricasTalking" }];
// Supported Countries
export const SupportedTerritories = [
    { territory: "Uganda", countryIsoCode: "UG" },
    { territory: "Kenya", countryIsoCode: "KE" },
];
// Regular Expressions
export const EmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Known links
export const TUGENDE_JIRA_ISSUES_LINK = "https://gotugende.atlassian.net/browse/";
export const APP_BASE_CONTEXT = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/#";

// Known Topics
export const TOPIC_COLLECTIONS_NAME = "Collections";
export const TOPIC_KNOWN_PROMISE_TO_PAY_OPTION_NAME = "Promise To Pay";

// Module Values
export const MODULE_BACKOFFICE_VALUE = 1;
export const MODULE_VETTING_VALUE = 2;
export const MODULE_INCIDENTS_VALUE = 3;
export const MODULE_ENGAGEMENTS_VALUE = 4;
export const MODULE_STAFFAPP_PAYMENTS_VALUE = 8;

// Permission Ids
export const VETTING_GET_TOOLS_ID = 300;
export const VETTING_GET_TOOL_DETAILS_ID = 302;
export const VETTING_GET_SALESFORCE_CLIENTS_ID = 502;
export const ENGAGEMENTS_VIEW_DASHBOARD_ID = 300;
export const BACKOFFICE_MANAGE_USERS_ID = 2;

export const VETTING_BACKOFFICE_PERMISSIONS_ARRAY = [VETTING_GET_TOOLS_ID, VETTING_GET_SALESFORCE_CLIENTS_ID];
export const ENGAGEMENTS_BACKOFFICE_PERMISSIONS_ARRAY = [ENGAGEMENTS_VIEW_DASHBOARD_ID];

// Leads Generation
export const LEADS_GENERATION_SALUTATION_LOOKUP_NAME = "Salutation";
export const LEADS_GENERATION_INDUSTRY_LOOKUP_NAME = "Industry";
export const LEADS_GENERATION_LEAD_SOURCE_LOOKUP_NAME = "Lead Source";
export const LEADS_GENERATION_LEAD_CURRENCY_LOOKUP_NAME = "Lead Currency";
export const LEADS_GENERATION_RATING_LOOKUP_NAME = "Rating";
export const LEADS_GENERATION_STATUS_LOOKUP_NAME = "Status";
export const LEADS_GENERATION_TERRITORY_LOOKUP_NAME = "Territory";
export const LEADS_GENERATION_MAKE_LOOKUP_NAME = "Make";
export const LEADS_GENERATION_FORECAST_LOOKUP_NAME = "Forecast Category";
export const LEADS_GENERATION_EQUIPMENT_TYPE_LOOKUP_NAME = "Type Of Equipment";
export const LEADS_GENERATION_BRANCH_LOOKUP_NAME = "Branch of Management";
export const LEADS_GENERATION_LANGUAGE_LOOKUP_NAME = "Preferred Message Language";
export const LEADS_GENERATION_GENDER_LOOKUP_NAME = "Gender";
export const LEADS_GENERATION_EDUCATION_LOOKUP_NAME = "Highest Level of Education";
export const LEADS_GENERATION_ID_TYPE_LOOKUP_NAME = "National Identification Type";
export const LEADS_GENERATION_HAS_TIN_LOOKUP_NAME = "Permit Processing Assistance";
export const LEADS_GENERATION_DRAFT_STATUS = "Draft";
export const LEADS_GENERATION_FINAL_STATUS = "Final";
export const LEADS_GENERATION_OPPORTUNITY_STATUS = "Opportunity";
export const LEADS_GENERATION_ACCOUNT_STATUS = "Account";
export const LEADS_GENERATION_LEAD_STATUSES = [
    { key: LEADS_GENERATION_DRAFT_STATUS, value: 0 },
    { key: LEADS_GENERATION_FINAL_STATUS, value: 1 },
    { key: LEADS_GENERATION_OPPORTUNITY_STATUS, value: 2 },
    { key: LEADS_GENERATION_ACCOUNT_STATUS, value: 3 },
];
