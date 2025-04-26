import React from "react";

function PostOfficeCard({ office }) {
  return (
    <div className="card">
      <p>
        <strong>Name:</strong> {office.Name}
      </p>
      <p>
        <strong>Branch Type:</strong> {office.BranchType}
      </p>
      <p>
        <strong>Delivery Status:</strong> {office.DeliveryStatus}
      </p>
      <p>
        <strong>District:</strong> {office.District}
      </p>
      <p>
        <strong>State:</strong> {office.State}
      </p>
    </div>
  );
}

export default PostOfficeCard;
