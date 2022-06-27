import { useNavigate } from "react-router-dom"

const NavigateHook = (to: string) => {
    const navigate = useNavigate();

    return navigate(to);
}

export default NavigateHook;