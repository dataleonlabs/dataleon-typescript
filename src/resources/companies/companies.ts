// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as DocumentsAPI from './documents';
import { DocumentUploadParams, Documents } from './documents';
import * as IndividualsDocumentsAPI from '../individuals/documents';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Companies extends APIResource {
  documents: DocumentsAPI.Documents = new DocumentsAPI.Documents(this._client);

  /**
   * Create a new company
   *
   * @example
   * ```ts
   * const companyRegistration = await client.companies.create({
   *   company: { name: 'ACME Corp' },
   *   workspace_id: 'wk_123',
   * });
   * ```
   */
  create(body: CompanyCreateParams, options?: RequestOptions): APIPromise<CompanyRegistration> {
    return this._client.post('/companies', { body, ...options });
  }

  /**
   * Get a company by ID
   *
   * @example
   * ```ts
   * const companyRegistration = await client.companies.retrieve(
   *   'company_id',
   * );
   * ```
   */
  retrieve(
    companyID: string,
    query: CompanyRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CompanyRegistration> {
    return this._client.get(path`/companies/${companyID}`, { query, ...options });
  }

  /**
   * Update a company by ID
   *
   * @example
   * ```ts
   * const companyRegistration = await client.companies.update(
   *   'company_id',
   *   {
   *     company: { name: 'ACME Corp' },
   *     workspace_id: 'wk_123',
   *   },
   * );
   * ```
   */
  update(
    companyID: string,
    body: CompanyUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CompanyRegistration> {
    return this._client.put(path`/companies/${companyID}`, { body, ...options });
  }

  /**
   * Get all companies
   *
   * @example
   * ```ts
   * const companyRegistrations = await client.companies.list();
   * ```
   */
  list(
    query: CompanyListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CompanyListResponse> {
    return this._client.get('/companies', { query, ...options });
  }

  /**
   * Delete a company by ID
   *
   * @example
   * ```ts
   * await client.companies.delete('company_id');
   * ```
   */
  delete(companyID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/companies/${companyID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface CompanyRegistration {
  /**
   * List of AML (Anti-Money Laundering) suspicion entries linked to the company,
   * including their details.
   */
  aml_suspicions?: Array<CompanyRegistration.AmlSuspicion>;

  /**
   * Digital certificate associated with the company, if any, including its creation
   * timestamp and filename.
   */
  certificat?: CompanyRegistration.Certificat;

  /**
   * List of verification or validation checks applied to the company, including
   * their results and messages.
   */
  checks?: Array<Shared.Check>;

  /**
   * Main information about the company being registered, including legal name,
   * registration ID, and address.
   */
  company?: CompanyRegistration.Company;

  /**
   * All documents submitted or associated with the company, including their metadata
   * and processing status.
   */
  documents?: Array<IndividualsDocumentsAPI.GenericDocument>;

  /**
   * List of members or actors associated with the company, including personal and
   * ownership information.
   */
  members?: Array<CompanyRegistration.Member>;

  /**
   * Admin or internal portal URL for viewing the company's details, typically used
   * by internal users.
   */
  portal_url?: string;

  /**
   * Custom key-value metadata fields associated with the company, allowing for
   * flexible data storage.
   */
  properties?: Array<CompanyRegistration.Property>;

  /**
   * Risk assessment associated with the company, including a risk code, reason, and
   * confidence score.
   */
  risk?: CompanyRegistration.Risk;

  /**
   * Optional identifier indicating the source of the company record, useful for
   * tracking or integration purposes.
   */
  source_id?: string;

  /**
   * Technical metadata related to the request, such as IP address, QR code settings,
   * and callback URLs.
   */
  technical_data?: CompanyRegistration.TechnicalData;

  /**
   * Public-facing webview URL for the company’s identification process, allowing
   * external access to the company data.
   */
  webview_url?: string;
}

export namespace CompanyRegistration {
  /**
   * Represents a record of suspicion raised during Anti-Money Laundering (AML)
   * screening. Includes metadata such as risk score, origin, and linked watchlist
   * types.
   */
  export interface AmlSuspicion {
    /**
     * Human-readable description or title for the suspicious finding.
     */
    caption?: string;

    /**
     * Indicates whether this suspicion has been manually reviewed or confirmed.
     */
    checked?: boolean;

    /**
     * Nature of the relationship between the entity and the suspicious activity (e.g.,
     * "linked", "associated").
     */
    relation?: string;

    /**
     * Version of the evaluation schema or rule engine used.
     */
    schema?: string;

    /**
     * Risk score between 0.0 and 1.0 indicating the severity of the suspicion.
     */
    score?: number;

    /**
     * URL identifying the source system or service providing this suspicion.
     */
    source?: string;

    /**
     * Watchlist category associated with the suspicion. Possible values include
     * Watchlist types like "PEP", "Sanctions", "RiskyEntity", or "Crime".
     */
    type?: 'Watchlist' | 'PEP' | 'Sanctions' | 'RiskyEntity' | 'Crime';
  }

  /**
   * Digital certificate associated with the company, if any, including its creation
   * timestamp and filename.
   */
  export interface Certificat {
    /**
     * Unique identifier for the certificate.
     */
    id?: string;

    /**
     * Timestamp when the certificate was created.
     */
    created_at?: string;

    /**
     * Name of the certificate file.
     */
    filename?: string;
  }

  /**
   * Main information about the company being registered, including legal name,
   * registration ID, and address.
   */
  export interface Company {
    /**
     * Full registered address of the company.
     */
    address?: string;

    /**
     * Trade or commercial name of the company.
     */
    commercial_name?: string;

    /**
     * Contact information for the company, including email, phone number, and address.
     */
    contact?: Company.Contact;

    /**
     * Country code where the company is registered.
     */
    country?: string;

    /**
     * Contact email address for the company.
     */
    email?: string;

    /**
     * Employer Identification Number (EIN) or equivalent.
     */
    employer_identification_number?: string;

    /**
     * Legal form or structure of the company (e.g., LLC, SARL).
     */
    legal_form?: string;

    /**
     * Legal registered name of the company.
     */
    name?: string;

    /**
     * Contact phone number for the company, including country code.
     */
    phone_number?: string;

    /**
     * Date when the company was officially registered.
     */
    registration_date?: string;

    /**
     * Official company registration number or ID.
     */
    registration_id?: string;

    /**
     * Total share capital of the company, including currency.
     */
    share_capital?: string;

    /**
     * Current status of the company (e.g., active, inactive).
     */
    status?: string;

    /**
     * Tax identification number for the company.
     */
    tax_identification_number?: string;

    /**
     * Type of company within the workspace, e.g., main or affiliated.
     */
    type?: string;

    /**
     * Official website URL of the company.
     */
    website_url?: string;
  }

  export namespace Company {
    /**
     * Contact information for the company, including email, phone number, and address.
     */
    export interface Contact {
      /**
       * Department of the contact person.
       */
      department?: string;

      /**
       * Email address of the contact person.
       */
      email?: string;

      /**
       * First name of the contact person.
       */
      first_name?: string;

      /**
       * Last name of the contact person.
       */
      last_name?: string;

      /**
       * Phone number of the contact person.
       */
      phone_number?: string;
    }
  }

  /**
   * Represents a member or actor of a company, including personal and ownership
   * information.
   */
  export interface Member {
    id?: string;

    /**
     * Address of the member, which may include street, city, postal code, and country.
     */
    address?: string;

    /**
     * Birthday (available only if type = person)
     */
    birthday?: string;

    /**
     * Birthplace (available only if type = person)
     */
    birthplace?: string;

    /**
     * ISO 3166-1 alpha-2 country code of the member's address (e.g., "FR" for France).
     */
    country?: string;

    /**
     * List of documents associated with the member, including their metadata and
     * processing status.
     */
    documents?: Array<IndividualsDocumentsAPI.GenericDocument>;

    /**
     * Email address of the member, which may be used for communication or verification
     * purposes.
     */
    email?: string;

    /**
     * First name (available only if type = person)
     */
    first_name?: string;

    /**
     * Indicates whether the member is a beneficial owner of the company, meaning they
     * have significant control or ownership.
     */
    is_beneficial_owner?: boolean;

    /**
     * Indicates whether the member is a delegator, meaning they have authority to act
     * on behalf of the company.
     */
    is_delegator?: boolean;

    /**
     * Last name (available only if type = person)
     */
    last_name?: string;

    /**
     * Indicates whether liveness verification was performed for the member, typically
     * in the context of identity checks.
     */
    liveness_verification?: boolean;

    /**
     * Company name (available only if type = company)
     */
    name?: string;

    /**
     * Percentage of ownership the member has in the company, expressed as an integer
     * between 0 and 100.
     */
    ownership_percentage?: number;

    /**
     * Contact phone number of the member, including country code and area code.
     */
    phone_number?: string;

    /**
     * Postal code of the member's address, typically a numeric or alphanumeric code.
     */
    postal_code?: string;

    /**
     * Official registration identifier of the member, such as a national ID or company
     * registration number.
     */
    registration_id?: string;

    /**
     * Type of relationship the member has with the company, such as "shareholder",
     * "director", or "beneficial_owner".
     */
    relation?: string;

    /**
     * Role of the member within the company, such as "legal_representative",
     * "director", or "manager".
     */
    roles?: string;

    /**
     * Source of the data (e.g., government, user, company)
     */
    source?: 'gouve' | 'user' | 'company';

    /**
     * Current state of the member in the workflow, such as "WAITING", "STARTED",
     * "RUNNING", or "PROCESSED".
     */
    state?: string;

    /**
     * Status of the member in the system, indicating whether they are approved,
     * pending, or rejected. Possible values include "approved", "need_review",
     * "rejected".
     */
    status?: string;

    /**
     * Member type (person or company)
     */
    type?: 'person' | 'company';

    /**
     * Identifier of the workspace to which the member belongs, used for organizational
     * purposes.
     */
    workspace_id?: string;
  }

  /**
   * Represents a generic property key-value pair with a specified type.
   */
  export interface Property {
    /**
     * Name/key of the property.
     */
    name?: string;

    /**
     * Data type of the property value.
     */
    type?: string;

    /**
     * Value associated with the property name.
     */
    value?: string;
  }

  /**
   * Risk assessment associated with the company, including a risk code, reason, and
   * confidence score.
   */
  export interface Risk {
    /**
     * Risk category or code identifier.
     */
    code?: string;

    /**
     * Explanation or justification for the assigned risk.
     */
    reason?: string;

    /**
     * Numeric risk score between 0.0 and 1.0 indicating severity or confidence.
     */
    score?: number;
  }

  /**
   * Technical metadata related to the request, such as IP address, QR code settings,
   * and callback URLs.
   */
  export interface TechnicalData {
    /**
     * Version number of the API used.
     */
    api_version?: number;

    /**
     * Timestamp when the request or process was approved.
     */
    approved_at?: string;

    /**
     * URL to receive callback data from the AML system.
     */
    callback_url?: string;

    /**
     * URL to receive notification updates about the processing status.
     */
    callback_url_notification?: string;

    /**
     * Flag to indicate if notifications are disabled.
     */
    disable_notification?: boolean;

    /**
     * Timestamp when notifications were disabled; null if never disabled.
     */
    disable_notification_date?: string | null;

    /**
     * Export format defined by the API (e.g., "json", "xml").
     */
    export_type?: string;

    /**
     * Timestamp when the process finished.
     */
    finished_at?: string;

    /**
     * IP address of the our system handling the request.
     */
    ip?: string;

    /**
     * Language preference used in the client workspace (e.g., "fra").
     */
    language?: string;

    /**
     * IP address of the end client (final user) captured.
     */
    location_ip?: string;

    /**
     * Timestamp indicating when the request or process needs review; null if none.
     */
    need_review_at?: string | null;

    /**
     * Flag indicating if notification confirmation is required or received.
     */
    notification_confirmation?: boolean;

    /**
     * Indicates whether QR code is enabled ("true" or "false").
     */
    qr_code?: string;

    /**
     * Flag indicating whether to include raw data in the response.
     */
    raw_data?: boolean;

    /**
     * Timestamp when the request or process was rejected; null if not rejected.
     */
    rejected_at?: string | null;

    /**
     * Duration of the user session in seconds.
     */
    session_duration?: number;

    /**
     * Timestamp when the process started.
     */
    started_at?: string;

    /**
     * Date/time of data transfer.
     */
    transfer_at?: string;

    /**
     * Mode of data transfer.
     */
    transfer_mode?: string;
  }
}

export type CompanyListResponse = Array<CompanyRegistration>;

export interface CompanyCreateParams {
  /**
   * Main information about the company being registered.
   */
  company: CompanyCreateParams.Company;

  /**
   * Unique identifier of the workspace in which the company is being created.
   */
  workspace_id: string;

  /**
   * Optional identifier to track the origin of the request or integration from your
   * system.
   */
  source_id?: string;

  /**
   * Technical metadata and callback configuration.
   */
  technical_data?: CompanyCreateParams.TechnicalData;
}

export namespace CompanyCreateParams {
  /**
   * Main information about the company being registered.
   */
  export interface Company {
    /**
     * Legal name of the company.
     */
    name: string;

    /**
     * Registered address of the company.
     */
    address?: string;

    /**
     * Commercial or trade name of the company, if different from the legal name.
     */
    commercial_name?: string;

    /**
     * ISO 3166-1 alpha-2 country code of company registration (e.g., "FR" for France).
     */
    country?: string;

    /**
     * Contact email address for the company.
     */
    email?: string;

    /**
     * Employer Identification Number (EIN) or equivalent.
     */
    employer_identification_number?: string;

    /**
     * Legal structure of the company (e.g., SARL, SAS).
     */
    legal_form?: string;

    /**
     * Contact phone number for the company.
     */
    phone_number?: string;

    /**
     * Date of official company registration in YYYY-MM-DD format.
     */
    registration_date?: string;

    /**
     * Official company registration identifier.
     */
    registration_id?: string;

    /**
     * Declared share capital of the company, usually in euros.
     */
    share_capital?: string;

    /**
     * Current status of the company (e.g., active, inactive).
     */
    status?: string;

    /**
     * National tax identifier (e.g., VAT or TIN).
     */
    tax_identification_number?: string;

    /**
     * Type of company, such as "main" or "affiliated".
     */
    type?: string;

    /**
     * Company’s official website URL.
     */
    website_url?: string;
  }

  /**
   * Technical metadata and callback configuration.
   */
  export interface TechnicalData {
    /**
     * URL to receive a callback once the company is processed.
     */
    callback_url?: string;

    /**
     * URL to receive notifications about the processing state and status.
     */
    callback_url_notification?: string;

    /**
     * Preferred language for responses or notifications (e.g., "eng", "fra").
     */
    language?: string;

    /**
     * Flag indicating whether to include raw data in the response.
     */
    raw_data?: boolean;
  }
}

export interface CompanyRetrieveParams {
  /**
   * Include document signed url
   */
  document?: boolean;

  /**
   * Scope filter (id or scope)
   */
  scope?: string;
}

export interface CompanyUpdateParams {
  /**
   * Main information about the company being registered.
   */
  company: CompanyUpdateParams.Company;

  /**
   * Unique identifier of the workspace in which the company is being created.
   */
  workspace_id: string;

  /**
   * Optional identifier to track the origin of the request or integration from your
   * system.
   */
  source_id?: string;

  /**
   * Technical metadata and callback configuration.
   */
  technical_data?: CompanyUpdateParams.TechnicalData;
}

export namespace CompanyUpdateParams {
  /**
   * Main information about the company being registered.
   */
  export interface Company {
    /**
     * Legal name of the company.
     */
    name: string;

    /**
     * Registered address of the company.
     */
    address?: string;

    /**
     * Commercial or trade name of the company, if different from the legal name.
     */
    commercial_name?: string;

    /**
     * ISO 3166-1 alpha-2 country code of company registration (e.g., "FR" for France).
     */
    country?: string;

    /**
     * Contact email address for the company.
     */
    email?: string;

    /**
     * Employer Identification Number (EIN) or equivalent.
     */
    employer_identification_number?: string;

    /**
     * Legal structure of the company (e.g., SARL, SAS).
     */
    legal_form?: string;

    /**
     * Contact phone number for the company.
     */
    phone_number?: string;

    /**
     * Date of official company registration in YYYY-MM-DD format.
     */
    registration_date?: string;

    /**
     * Official company registration identifier.
     */
    registration_id?: string;

    /**
     * Declared share capital of the company, usually in euros.
     */
    share_capital?: string;

    /**
     * Current status of the company (e.g., active, inactive).
     */
    status?: string;

    /**
     * National tax identifier (e.g., VAT or TIN).
     */
    tax_identification_number?: string;

    /**
     * Type of company, such as "main" or "affiliated".
     */
    type?: string;

    /**
     * Company’s official website URL.
     */
    website_url?: string;
  }

  /**
   * Technical metadata and callback configuration.
   */
  export interface TechnicalData {
    /**
     * URL to receive a callback once the company is processed.
     */
    callback_url?: string;

    /**
     * URL to receive notifications about the processing state and status.
     */
    callback_url_notification?: string;

    /**
     * Preferred language for responses or notifications (e.g., "eng", "fra").
     */
    language?: string;

    /**
     * Flag indicating whether to include raw data in the response.
     */
    raw_data?: boolean;
  }
}

export interface CompanyListParams {
  /**
   * Filter companies created before this date (format YYYY-MM-DD)
   */
  end_date?: string;

  /**
   * Number of results to return (between 1 and 100)
   */
  limit?: number;

  /**
   * Number of results to skip (must be ≥ 0)
   */
  offset?: number;

  /**
   * Filter by source ID
   */
  source_id?: string;

  /**
   * Filter companies created after this date (format YYYY-MM-DD)
   */
  start_date?: string;

  /**
   * Filter by company state (must be one of the allowed values)
   */
  state?:
    | 'VOID'
    | 'WAITING'
    | 'STARTED'
    | 'RUNNING'
    | 'PROCESSED'
    | 'FAILED'
    | 'ABORTED'
    | 'EXPIRED'
    | 'DELETED';

  /**
   * Filter by individual status (must be one of the allowed values)
   */
  status?: 'rejected' | 'need_review' | 'approved';

  /**
   * Filter by workspace ID
   */
  workspace_id?: string;
}

Companies.Documents = Documents;

export declare namespace Companies {
  export {
    type CompanyRegistration as CompanyRegistration,
    type CompanyListResponse as CompanyListResponse,
    type CompanyCreateParams as CompanyCreateParams,
    type CompanyRetrieveParams as CompanyRetrieveParams,
    type CompanyUpdateParams as CompanyUpdateParams,
    type CompanyListParams as CompanyListParams,
  };

  export { Documents as Documents, type DocumentUploadParams as DocumentUploadParams };
}
