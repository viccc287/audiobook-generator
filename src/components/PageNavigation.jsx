import { useGlobalContext } from "../contexts/GlobalContext";

export default function PageNavigation() {
    const { state, dispatch } = useGlobalContext();
    const pageNumber = state.pages.length;
    return (
        <div className="flex h-1/4 border-4 border-white">Hola</div>
    )

}