import styles from "./EditArticlePage.module.css"
import ArticleForm from "../../components/Article/ArticleForm"
import { FormProps } from "../../components/Article/ArticleForm";
import axios, {AxiosError} from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatcher, RootState } from "../../store/store";
import { PREFIX } from "../../store/user.slice";
import { useNavigate, useParams } from "react-router-dom";
import { blogAction } from "../../store/blogs.slice";


const EditArticlePage = () => {

       const jwt = useSelector((s: RootState) => s.user.jwt) 
      const { slug } = useParams();

       const navigate = useNavigate();
       const dispatch = useDispatch<AppDispatcher>();




    const handleOnSubmit = async(data: FormProps) => {
    
         const newArticle = {
            article: {
                title: data.title,
                description: data.description,
                body: data.body, 
                tagList: data.tagList.map(tag => tag.name)
              
            }
         }
         try {
           const response = await axios.put(`${PREFIX}/articles/${slug}`,
                newArticle,
                 {
			headers: {
				Authorization: `Token ${jwt}`,
                "Content-Type": "application/json;charset=utf-8",
			}
		}
            )

    dispatch(blogAction.updateArticle(response.data.article))
 navigate(`/articles/${slug}`);
         } catch (e) {
            {
      if (e instanceof AxiosError) {
        console.error(e.response?.data.message);
      } else {
        console.error(e);
      }
    }
         }
 
    }
    return(
        <section className={styles["article"]}>
            <ArticleForm 
            articleTitle="Edit article"
            handleOnSubmit={handleOnSubmit}/>
        </section>
    )
}

export default EditArticlePage