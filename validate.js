/*Add the JavaScript here for the function billingFunction().  It is responsible for setting and clearing the fields in Billing Information */
function billingFunction() {
  const element = (el) => document.getElementById(el);
  const billName = element('billingName');
  const billZip = element('billingZip');

  if (element('same').checked){
    billName.value = element('shippingName').value;
    billName.removeAttribute('required');
    billZip.value = element('shippingZip').value;
  } else {
    billName.value = '';
    billName.removeAttribute('required');
    billZip.value = '';
    billZip.removeAttribute('required');
  }
}
