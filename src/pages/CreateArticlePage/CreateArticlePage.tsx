import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { AppDispatcher, RootState } from "../../store/store";
import ArticleForm, { FormProps } from "../../components/Article/ArticleForm";
import { blogAction } from "../../store/blogs.slice";
import { PREFIX } from "../../store/user.slice";

import styles from "./CreateArticlePage.module.css";

const CreateArticlePage = () => {
  const jwt = useSelector((s: RootState) => s.user.jwt);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatcher>();

  const handleOnSubmit = async (data: FormProps) => {
    const newArticle = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList.map((tag) => tag.name),
      },
    };
    try {
      const response = await axios.post(`${PREFIX}/articles`, newArticle, {
        headers: {
          Authorization: `Token ${jwt}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      await dispatch(blogAction.addArticle(response.data.article));

      navigate("/", { replace: true });
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error(e.response?.data.message);
      } else {
        console.error(e);
      }
    }
  };

  return (
    <section className={styles["article"]}>
      <ArticleForm
        articleTitle="Create new article"
        handleOnSubmit={handleOnSubmit}
      />
    </section>
  );
};

export default CreateArticlePage;
