# Company Workflow

## Data Elements
 * companyId
 * companyName
 * streetAddress
 * city
 * stateProvince
 * postalCode
 * country
 * telephone
 * email
 * status (suspended, active, pending-review)
 * dateCreated
 * dateUpdated

## Action Elements
 
 * create
   * companyName[R], streetAddress, city, stateProvince, postalCode, country(US), telephone, email[R], status(pending-review)
 * update
   * companyId[R], companyName[R], streetAddress, city, stateProvince, postalCode, country(US), telephone, email[R], status
 * delete
   * companyId[R]
 * read
   * companyId[R]
 * filter 
   * status, country, state/province, companyName

