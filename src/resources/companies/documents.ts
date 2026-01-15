// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as IndividualsDocumentsAPI from '../individuals/documents';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Documents extends APIResource {
  /**
   * Get documents to an company
   *
   * @example
   * ```ts
   * const documentResponse =
   *   await client.companies.documents.list('company_id');
   * ```
   */
  list(companyID: string, options?: RequestOptions): APIPromise<IndividualsDocumentsAPI.DocumentResponse> {
    return this._client.get(path`/companies/${companyID}/documents`, options);
  }

  /**
   * Upload documents to an company
   *
   * @example
   * ```ts
   * const genericDocument =
   *   await client.companies.documents.upload('company_id', {
   *     document_type: 'liasse_fiscale',
   *   });
   * ```
   */
  upload(
    companyID: string,
    body: DocumentUploadParams,
    options?: RequestOptions,
  ): APIPromise<IndividualsDocumentsAPI.GenericDocument> {
    return this._client.post(
      path`/companies/${companyID}/documents`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface DocumentUploadParams {
  /**
   * Filter by document type for upload (must be one of the allowed values)
   */
  document_type:
    | 'liasse_fiscale'
    | 'amortised_loan_schedule'
    | 'invoice'
    | 'receipt'
    | 'company_statuts'
    | 'registration_company_certificate'
    | 'kbis'
    | 'rib'
    | 'check'
    | 'livret_famille'
    | 'birth_certificate'
    | 'payslip'
    | 'social_security_card'
    | 'vehicle_registration_certificate'
    | 'carte_grise'
    | 'criminal_record_extract'
    | 'proof_of_address'
    | 'identity_card_front'
    | 'identity_card_back'
    | 'driver_license_front'
    | 'driver_license_back'
    | 'identity_document'
    | 'driver_license'
    | 'passport'
    | 'tax'
    | 'certificate_of_incorporation'
    | 'certificate_of_good_standing'
    | 'lcb_ft_lab_aml_policies'
    | 'niu_entreprise'
    | 'financial_statements'
    | 'rccm'
    | 'proof_of_source_funds'
    | 'organizational_chart'
    | 'risk_policies';

  /**
   * File to upload (required)
   */
  file?: Uploadable;

  /**
   * URL of the file to upload (either `file` or `url` is required)
   */
  url?: string;
}

export declare namespace Documents {
  export { type DocumentUploadParams as DocumentUploadParams };
}
