import Headling from "../Headling/Headling";
import NavigationButton from "../NavigationButton/NavigationButton";
import Button from "../Button/Button";
import styles from "./Article.module.css";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { ArticleFormProps } from "./Article.props";
import { useEffect} from "react";
import { PREFIX } from "../../store/user.slice";

export type FormProps = {
  title: string;
  description: string;
  body: string;
  username?: string;
  tagList: { name: string }[];
};

const ArticleForm = ({ articleTitle, handleOnSubmit }: ArticleFormProps) => {
  const { slug } = useParams();


  const getArticle = async (slug: string | undefined) => {
    try {
      const { data } = await axios.get(`${PREFIX}/articles/${slug}`);
  
      return data.article;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
      throw e;
    }
  };

    const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormProps>({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      username: '',
      tagList: [{}]
    }
  });

    const { fields, prepend, remove } = useFieldArray({
    name: "tagList",
    control,
    rules: {
      required: "Please add at least one tag",
      minLength: 1
    }
  });

  useEffect(() => {
    if (slug) {
      getArticle(slug).then(article => {
        if (article) {
          reset({
            title: article.title,
            description: article.description,
            body: article.body,
            username: article.username || null,
            tagList: article.tagList ? article.tagList.map((tag: string) => ({ name: tag })) : [{}]
          });
        }
      });
    }
  },[slug, reset] );




  const onSubmit: SubmitHandler<FormProps> = (data) => {
    handleOnSubmit(data);
    console.log("Form submitted", data);
  };

  return (
    <div className={styles["article"]}>
      <Headling>{articleTitle}</Headling>
      <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['field']}>
          <label htmlFor="title">Title</label>
          <input
            id='title'
            type="text"
            placeholder='Title'
            {...register("title", {
              required: "The title is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
              maxLength: { value: 35, message: "Maximum 35 characters" },
            })}
          />
          {errors.title && <p className={styles["error"]}>{errors.title.message}</p>}
        </div>

        <div className={styles['field']}>
          <label htmlFor="description">Short description</label>
          <input
            id='description'
            type="text"
            placeholder='Short description'
            {...register("description", {
              required: "Short description is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
              maxLength: { value: 35, message: "Maximum 35 characters" },
            })}
          />
          {errors.description && <p className={styles["error"]}>{errors.description.message}</p>}
        </div>

        <div className={styles['field']}>
          <label htmlFor="body">Text</label>
          <textarea
            id='body'
            placeholder='Text'
            rows={10}
            {...register("body", {
              required: "Text is required"
            })}
          />
          {errors.body && <p className={styles["error"]}>{errors.body.message}</p>}
        </div>

        <label>Tags</label>
        {fields.map((field, index) => (
          <section key={field.id}>
            <div className={styles['field']}>
              <div className={styles["tag-field"]}>
                <input
                  type='text'
                  placeholder='Tags'
                  {...register(`tagList.${index}.name`, {
                    required: "Enter a tag name"
                  })}
                />
                <NavigationButton
                  onClick={() => remove(index)}
                  appearance="red">Delete</NavigationButton>
              </div>
              {errors.tagList?.[index]?.name && (
                <p className={styles["error"]}>{errors.tagList[index]?.name?.message}</p>
              )}
            </div>
          </section>
        ))}

        <NavigationButton
          onClick={() => prepend({ name: "" })}
          appearance="blue" color="11890FF ">Add tag</NavigationButton>

        {errors.tagList?.root?.message && <p className={styles["error"]}>{errors.tagList.root.message}</p>}

        <Button type="submit" className={styles["form-button"]}>Send</Button>
      </form>
    </div>
  );
};

export default ArticleForm;
