# Company Vocabulary

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
 * status (suspended, active, pending,closed)
 * dateCreated
 * dateUpdated

## Action Elements
 
 * list
 * create
   * companyName[R], streetAddress, city, stateProvince, postalCode, country(US), telephone, email[R], status(pending)[R]
 * read
   * companyId[R]
 * update
   * companyId[R], companyName[R], streetAddress, city, stateProvince, postalCode, country(US), telephone, email[R], status[R]
 * delete
   * companyId[R]
 * filter 
   * status, country, state/province, companyName

