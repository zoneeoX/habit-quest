import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UseNavigateHook({ url }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("dashboard/discover")
  }, [])
}
