import { getSearchParams, loadHeaderAndFooter } from "./utils";
import PostData from "./data-fetching/PostData"
import SearchPage from "./page-content-loading/SearchPage"

loadHeaderAndFooter()



const searchPageLogic = new SearchPage()
searchPageLogic.render()
