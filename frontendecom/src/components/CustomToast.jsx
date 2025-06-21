import Toast from 'react-bootstrap/Toast';

function CustomToast({message, showToast, setShowToast}) {
    console.log("CustomToast message:", message);
  return (
    <>
    {showToast && (
    <Toast>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        {/* <strong className="me-auto">Bootstrap</strong>
        <small>11 mins ago</small> */}
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>)}
    </>
  );
}

export default CustomToast;