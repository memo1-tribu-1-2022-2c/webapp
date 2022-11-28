import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Action = (props) => {
  useEffect(() => props.action());
};

export function NavigateWP(props) {
  const navigate = useNavigateWParams();
  return <Action action={() => navigate(props.to)}/>;
};

export function useNavigateWParams() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const qParams = "?" + searchParams.toString();

  return (path) => {
    if (path === -1) {
      navigate(-1);
    } else {
      navigate({ pathname: path, search: qParams });
    }
  };
}
