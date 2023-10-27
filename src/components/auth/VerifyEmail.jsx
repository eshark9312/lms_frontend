import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../providers/authProvider";

const VerifyEmail = () => {
  const { token } = useParams();
  const { verifyEmail } = useAuth();
  useEffect(() => {
    if (token && token !== "") {
      verifyEmail(token);
    }
  }, [token]);

  return <div></div>;
};
export default VerifyEmail;
