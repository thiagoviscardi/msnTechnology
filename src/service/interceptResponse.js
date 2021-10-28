const successResponseCodes = [
  '200',
  '201',
  '202',
  '203',
  '204',
  '205',
  '206',
  '207',
  '208',
];

function interceptResponse(response, throwError = true) {
  if (!successResponseCodes.includes(String(response.status))) {
    if (throwError) {
      throw response;
    } else {
      return false;
    }
  }
  return true;
}

export default interceptResponse;
