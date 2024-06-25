/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import Headling from "../Headling/Headling";
import NavigationButton from "../NavigationButton/NavigationButton";
import Button from "../Button/Button";
import { PREFIX } from "../../store/user.slice";

import styles from "./Article.module.css";
import { ArticleFormProps } from "./Article.props";

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
      title: "",
      description: "",
      body: "",
      username: "",
      tagList: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "tagList",
    control,
    rules: {
      required: "Please add at least one tag",
      minLength: 1,
    },
  });

  useEffect(() => {
    if (slug) {
      getArticle(slug).then((article) => {
        if (article) {
          reset({
            title: article.title,
            description: article.description,
            body: article.body,
            username: article.username || null,
            tagList: article.tagList
              ? article.tagList.map((tag: string) => ({ name: tag }))
              : [{}],
          });
        }
      });
    }
  }, [slug, reset]);

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    handleOnSubmit(data);
  };

  return (
    <div className={styles.article}>
      <Headling>{articleTitle}</Headling>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input
            className={
              styles.input + (errors.title ? ` ${styles["error-input"]}` : "")
            }
            id="title"
            type="text"
            placeholder="Title"
            {...register("title", {
              required: "The title is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
              maxLength: { value: 35, message: "Maximum 35 characters" },
            })}
          />
          {errors.title && (
            <p className={styles.error}>{errors.title.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Short description</label>
          <input
            className={
              styles.input +
              (errors.description ? ` ${styles["error-input"]}` : "")
            }
            id="description"
            type="text"
            placeholder="Short description"
            {...register("description", {
              required: "Short description is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
              maxLength: { value: 35, message: "Maximum 35 characters" },
            })}
          />
          {errors.description && (
            <p className={styles.error}>{errors.description.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="body">Text</label>
          <textarea
            className={
              styles.input + (errors.body ? ` ${styles["error-input"]}` : "")
            }
            id="body"
            placeholder="Text"
            rows={10}
            {...register("body", {
              required: "Text is required",
            })}
          />
          {errors.body && <p className={styles.error}>{errors.body.message}</p>}
        </div>

        <label>Tags</label>
        <div className={styles.tagWrapper}>
          <div className={styles["tagSection"]}>
            {fields.map((field, index) => (
              <div className={styles.inputTag} key={field.id}>
                <input
                  className={
                    styles.input +
                    (errors.tagList ? ` ${styles["error-input"]}` : "")
                  }
                  type="text"
                  placeholder="Tags"
                  {...register(`tagList.${index}.name`, {
                    required: "Enter a tag name",
                  })}
                />
                <NavigationButton
                  onClick={() => {
                    if (fields.length > 1) {
                      remove(index);
                    } else {
                      reset({
                        ...reset,
                        tagList: fields.map((field, index) =>
                          index === index ? { name: "" } : field,
                        ),
                      });
                    }
                  }}
                  appearance="red"
                >
                  Delete
                </NavigationButton>
              </div>
            ))}
            <NavigationButton
              onClick={() => append({ name: "" })}
              appearance="blue"
              color="11890FF"
              className={styles.addButton}
            >
              Add tag
            </NavigationButton>
          </div>
        </div>
        {errors.tagList?.root?.message && (
          <p className={styles.error}>{errors.tagList.root.message}</p>
        )}

        <Button type="submit" className={styles.formButton}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default ArticleForm;
