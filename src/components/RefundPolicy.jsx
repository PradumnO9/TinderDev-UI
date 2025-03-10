import React from "react";

const RefundPolicy = () => {
  return (
    <div className="my-4">
      <div className="px-4 md:w-1/2 m-auto">
        <h1 className="text-center font-bold text-2xl">Refund Policy</h1>
        <ul className="my-2">
          <li className="my-2">
            At Tinderdev.live, we strive to provide the best service to our
            users. However, please be aware that , we do not offer any refunds
            under any circumstances.
          </li>
          <li className="my-2">
            By using our services, you acknowledge and agree that all payments
            made are non-refundable, and you will not be entitled to a refund
            once a transaction is completed.
          </li>
          <li className="my-2">
            If you encounter any issues or have concerns about the services
            provided, please feel free to contact our support team, and we will
            do our best to assist you.
          </li>
          <li className="my-2">Thank you for your understanding.</li>
        </ul>
      </div>
    </div>
  );
};

export default RefundPolicy;
